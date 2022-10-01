import { Customer } from '../../../../domain/customer/entity/customer'
import { CustomerRepositoryInterface } from '../../../../domain/customer/repository/customerRepositoryInterface'
import { Address } from '../../../../domain/customer/valueObject/address'
import { CustomerModel } from './model/customerModel'

export class CustomerSequelizeRepository implements CustomerRepositoryInterface {
  async create (entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      city: entity.address.city,
      number: entity.address.number,
      zipcode: entity.address.zip,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    })
  }

  async update (entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: entity.id,
        name: entity.name,
        street: entity.address.street,
        city: entity.address.city,
        number: entity.address.number,
        zipcode: entity.address.zip,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints
      },
      {
        where: {
          id: entity.id
        }
      }
    )
  }

  async find (id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findByPk(id)
    if (!customerModel) {
      throw new Error('Customer not found')
    }
    const customer = new Customer(customerModel.id, customerModel.name)
    customer.defineAddress(
      new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city
      )
    )
    customer.activate()
    customer.addRewardPoints(customerModel.rewardPoints)
    return customer
  }

  async findAll (): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll()
    return customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name)
      customer.defineAddress(
        new Address(
          customerModel.street,
          customerModel.number,
          customerModel.zipcode,
          customerModel.city
        )
      )
      customer.activate()
      customer.addRewardPoints(customerModel.rewardPoints)
      return customer
    })
  }
}
