export class Library<T> {
  private collection: T[] = [];

  add(item: T) {
    this.collection.push(item);
  }

  remove(item: T) {
    const index = this.collection.indexOf(item);
    if (index !== -1) this.collection.splice(index, 1);
  }

  getAll(): T[] {
    return [...this.collection];
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.collection.find(predicate);
  }
}
