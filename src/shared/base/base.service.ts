import { NotFoundException } from '@nestjs/common';
import { BaseEntity } from './base.entity';

export abstract class BaseService<T extends BaseEntity> {
  protected items: T[] = [];
  private idCounter = 1;

  create(createDto: Partial<T>): T {
    const newItem = {
      ...createDto,
      id: this.idCounter++,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as T;

    this.items.push(newItem);
    return newItem;
  }

  findAll(): T[] {
    return this.items.filter((item) => !item.deletedAt);
  }

  findOne(id: number): T {
    const item = this.items.find((item) => item.id === id && !item.deletedAt);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  update(id: number, updateDto: Partial<T>): T {
    const item = this.findOne(id);
    Object.assign(item, updateDto, { updatedAt: new Date() });
    return item;
  }

  remove(id: number): void {
    const item = this.findOne(id);
    item.deletedAt = new Date();
  }

  hardDelete(id: number): void {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    this.items.splice(index, 1);
  }
}
