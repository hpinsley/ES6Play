describe('sets', function(){
    it ('should have zero elements upon construction', function() {
        var set = new Set();
        set.add(1);

        expect(set.size).toBe(1);
        expect(set.has(1)).toBeTruthy();
        expect(set.has(2)).toBeFalsy();
    });

});

describe('maps', function(){
    it ('should have zero elements upon construction', function() {
        var map = new Map();
        expect(map.size).toBe(0);
    });

    it ('should behave like a dictionary', function() {
        var map = new Map();
        var key1 = {};
        var key2 = {name: 'Howard'};

        expect(map.size).toBe(0);
        map.set(key1, "Object value 1");
        map.set(key2, 2);

        expect(map.size).toBe(2);
        expect(map.has(key1)).toBeTruthy();
        expect(map.has(key2)).toBeTruthy();
        expect(map.has("xx")).toBeFalsy();

        let v1 = map.get(key1);
        expect(v1).toBe("Object value 1");

        let keys = map.keys();
        for (let k of keys) {
            console.log(k);
        }

    });

    it('can be constructed from an array of arrays', function(){
        var map = new Map([["A",1],["B",2],["C",3]]);
        expect(map.size).toBe(3);
    });

    it('should retrieve the correct value', function(){
        var map = new Map([["A",1],["B",2],["C",3]]);
        expect(map.get("B")).toBe(2);
    });

    it('can be iterated with forEach', function(){
        var map = new Map([["A",1],["B",2],["C",3]]);
        let count = 0;
        map.forEach((v,k) => {
            console.log(k,v);
            count += 1;
        });
        expect(count).toBe(3);
    });

    it('can be iterated with unpacking', function(){
        var map = new Map([["A",1],["B",2],["C",3]]);
        let count = 0;

        for (let [k,v] of map) {
            console.log(k, v);
            count += 1;
        }

        expect(count).toBe(3);

    });
});

describe('iterators', function(){
    it ('should have an array comprehension', function(){
        var arr = [for (i of [1,2,3,4]) i * i];
        expect(arr.length).toBe(4);
        expect(arr[3]).toBe(16);
    });

    it ('should be constructed with an for of statement', function(){
        console.log("Start of iteration");
        var count = 0;
        for (let i of [1,2,3,4,5]) {
            count += 1;
        }
        expect(count).toBe(5);
    });

    it ('should be able to be constructed from a function', function(){

        function *factorial() {
            let i = 1;
            let f = 1;

            for (;;) {
                i += 1;
                f = f * i;
                yield f;
            }
        }

        let iterator = factorial();

        expect(iterator.next().value).toBe(2);
        expect(iterator.next().value).toBe(6);
        expect(iterator.next().value).toBe(24);

        let count = 0;
        let lastFact = 0;

        for (let f of factorial()) {
            lastFact = f;
            count += 1;
            if (count == 5)
                break;
        }
        expect(lastFact).toBe(720);
    });
});

describe('comprehensions', function(){
    it ('should be able to create an array of arrays', function(){
        let arr = [ for (i of [1,2,3,4,5])
                    for (j of ['A','B','C']) if (j != 'B')
                    [i,j]
            ];
        console.log(arr);

        expect(arr.length).toBe(10);
        expect(arr[0][0]).toBe(1);
        expect(arr[0][1]).toBe('A');

    });

    it ('should be able to create an generator of arrays', function(){
        let gen = (for (i of [1,2,3,4,5])
            for (j of ['A','B','C']) if (j != 'B')
            [i,j]
        );

        expect(gen.next().value).toEqual([1,'A']);
        expect(gen.next().value).toEqual([1,'C']);

    });

});

describe('classes', function(){
    it ('can have getters and setters', function(){

        class Employee {
            constructor(name) {
                this._name = name;
            }

            get Name() {
                return this._name;
            }

            set Name(value) {
                this._name = value;
            }
        }

        var howard = new Employee("Howard");
        expect(howard.Name).toEqual("Howard");

    });
});