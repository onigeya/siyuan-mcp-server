// Mock FormData for Node environment
global.FormData = class FormData {
    constructor() {
        this.data = new Map();
    }

    append(key, value) {
        this.data.set(key, value);
    }

    get(key) {
        return this.data.get(key);
    }

    has(key) {
        return this.data.has(key);
    }

    delete(key) {
        return this.data.delete(key);
    }

    // 实现 Symbol.iterator
    [Symbol.iterator]() {
        return this.entries();
    }

    // 实现 entries 方法
    *entries() {
        for (const [key, value] of this.data) {
            yield [key, value];
        }
    }

    // 实现 forEach 方法
    forEach(callback) {
        for (const [key, value] of this.data) {
            callback(value, key, this);
        }
    }

    // 实现 getAll 方法
    getAll(key) {
        return this.data.get(key) ? [this.data.get(key)] : [];
    }

    // 实现 set 方法
    set(key, value) {
        this.data.set(key, value);
    }

    // 实现 keys 方法
    *keys() {
        for (const key of this.data.keys()) {
            yield key;
        }
    }

    // 实现 values 方法
    *values() {
        for (const value of this.data.values()) {
            yield value;
        }
    }
}; 