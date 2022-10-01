
import { Sequelize } from 'sequelize-typescript'
import SequelizePackage from 'sequelize'
import { OrderRepositoryInterface } from '../../../../domain/checkout/repository/orderRepositoryInteface'
import { Order } from '../../../../domain/checkout/entity/order'
import { OrderItem } from '../../../../domain/checkout/entity/orderItem'
import { OrderItemModel } from './model/orderItemModel'
import { OrderModel } from './model/orderModel'

export class OrderSequelizeRepository implements OrderRepositoryInterface {
  constructor (private readonly sequelize: Sequelize) {}

  async update (entity: Order): Promise<void> {
    let transaction: SequelizePackage.Transaction
    try {
      transaction = await this.sequelize.transaction()
      const orderItensDb = await OrderItemModel.findAll({ where: { order_id: entity.id } })
      const orderItemIDToDelete: string[] = []
      const orderItemToUpdate: OrderItem[] = []
      const orderItemToInsert: OrderItem[] = []

      entity.items.forEach((item) => {
        const itemDb = orderItensDb.find((itemDb) => itemDb.id === item.id)
        if (itemDb) {
          orderItemToUpdate.push(item)
        } else {
          orderItemToInsert.push(item)
        }
      })

      orderItensDb.forEach((itemDb) => {
        const item = entity.items.find((item) => item.id === itemDb.id)
        if (!item) {
          orderItemIDToDelete.push(itemDb.id)
        }
      })

      await OrderItemModel.destroy({ where: { id: orderItemIDToDelete }, transaction })

      const promises = []
      for (const item of orderItemToUpdate) {
        promises.push(OrderItemModel.update({
          quantity: item.quantity,
          price: item.price
        }, { where: { id: item.id }, transaction }))
      }

      for (const item of orderItemToInsert) {
        promises.push(OrderItemModel.create({
          id: item.id,
          order_id: entity.id,
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price
        }, { transaction }))
      }
      await Promise.all(promises)

      await OrderItemModel.update({
        order_id: entity.id,
        customer_id: entity.customerId,
        total: entity.total()
      }, { where: { id: entity.id }, transaction })
      await transaction.commit()
    } catch (error) {
      if (transaction) await transaction.rollback()
      throw error
    }
  }

  async find (id: string): Promise<Order> {
    const order = await OrderModel.findByPk(id, {
      include: ['items']
    })
    if (!order) {
      throw new Error('Order not found')
    }
    const items = order.items.map((item) => new OrderItem(item.id, item.product_id, item.price, item.quantity))
    return new Order(order.id, order.customer_id, items)
  }

  async findAll (): Promise<Order[]> {
    const orders = await OrderModel.findAll({ include: ['items'] })
    return orders.map((order) => {
      return new Order(order.id, order.customer_id, order.items.map((item) => {
        return new OrderItem(item.id, item.product_id, item.price, item.quantity)
      }))
    })
  }

  async create (order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: order.items.map((item) => {
        return new OrderItemModel({
          id: item.id,
          order_id: order.id,
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price
        })
      })
    }, {
      include: [{ model: OrderItemModel }]
    })
  }
}
