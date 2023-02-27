"use strict";
var HashTableCollection;
(function (HashTableCollection) {
    class HashTable {
        constructor(size = 53) {
            this.keyMap = new Array(size);
        }
        hash(key) {
            let total = 0;
            let WEIRD_PRIME = 31;
            for (let i = 0; i < Math.min(key.length, 100); i++) {
                let char = key[i];
                let value = char.charCodeAt(0) - 96;
                console.log(`char.charCodeAt(0): ${char.charCodeAt(0)} value: ${value}`);
                total = (total * WEIRD_PRIME + value) % this.keyMap.length;
                // console.log();
                // console.log(
                //   `total : ${total} WEIRD_PRIME: ${WEIRD_PRIME} value: ${value} keyMap.length: ${this.keyMap.length}`
                // );
            }
            return total;
        }
        set(key, value) {
            const idx = this.hash(key);
            if (!this.keyMap[idx]) {
                this.keyMap[idx] = new Array();
            }
            for (let [storedKey, storedValue] of this.keyMap[idx]) {
                if (storedKey === key) {
                    storedValue = value;
                    console.log(`${storedKey} ${key}`);
                    return;
                }
            }
            this.keyMap[idx].push([key, value]);
        }
        get(str) {
            const idx = this.hash(str);
            if (!this.keyMap[idx])
                return false;
            for (const [key, value] of this.keyMap[idx]) {
                if (key === str)
                    return value;
            }
            return false;
        }
        keys() {
            let keysArr = [];
            for (let i = 0; i < this.keyMap.length; i++) {
                if (this.keyMap[i]) {
                    for (const [key, value] of this.keyMap[i]) {
                        if (!keysArr.includes(key))
                            keysArr.push(key);
                    }
                }
            }
            return keysArr;
        }
        values() {
            let valuesArr = [];
            for (let i = 0; i < this.keyMap.length; i++) {
                if (this.keyMap[i]) {
                    for (const [key, value] of this.keyMap[i]) {
                        if (!valuesArr.includes(value))
                            valuesArr.push(value);
                    }
                }
            }
            return valuesArr;
        }
    }
    HashTableCollection.HashTable = HashTable;
})(HashTableCollection || (HashTableCollection = {}));
const hashTable = new HashTableCollection.HashTable();
console.log(hashTable.set("black", "pink"));
console.log(hashTable.set("ive", "LIS"));
console.log(hashTable.set("aespa", "winter"));
console.log(hashTable.set("newJeans", "daniel"));
console.log(hashTable.set("lese", "chaewon"));
console.log(hashTable.set("bright", "pink"));
console.log(hashTable.get("ive"));
console.log(hashTable.get("pink"));
console.log(hashTable.get("black"));
console.log(hashTable.get("ive"));
console.log(hashTable.values());
console.log(hashTable.keys());
console.log(hashTable.set("ive", "Lay"));
console.log(hashTable.values());
console.log(hashTable.keys());
