import * as codeLib from './code.js'

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

        let count = 0;
        let keys = map.keys();
        for (let k of keys) {
            count += 1;
        }
        expect(count).toBe(2);

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
            //console.log(k,v);
            count += 1;
        });
        expect(count).toBe(3);
    });

    it('can be iterated with unpacking', function(){
        var map = new Map([["A",1],["B",2],["C",3]]);
        let count = 0;

        for (let [k,v] of map) {
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

    it('can slice an array', function() {
        var a = [1,2,3];
        var b = a.slice(1);
        expect(a).toEqual([1,2,3]);
        expect(b).toEqual([2,3]);
    });

    it('can splice an array', function() {
        var a = [1,2,3];
        var b = a.splice(1,1);
        expect(a).toEqual([1,3]);
        expect(b).toEqual([2]);
    });

    it('can concat two arrays', function(){
        var a1 = [1,2,3];
        var a2 = [4,5,6];
        var a3 = a1.concat(a2);
        expect(a1).toEqual([1,2,3]);
        expect(a2).toEqual([4,5,6]);
        expect(a3).toEqual([1,2,3,4,5,6]);
    });

    it('can use remove method on array', function(){
        var arr = [1,2,3];
        var extract = arr.remove(1);
        expect(arr).toEqual([1,2,3]);
        expect(extract).toEqual([1,3]);
        expect(arr.remove(0)).toEqual([2,3]);
        expect(arr.remove(1)).toEqual([1,3]);
        expect(arr.remove(2)).toEqual([1,2]);
    });

    function permutations1(arr) {
        if (arr.length <= 1) {
            return [arr];
        }

        let result = [];
        for (let i = 0; i< arr.length; ++i) {
            let item = [arr[i]];
            let rest = arr.remove(i);
            let p = permutations1(rest);
            for (let combo of p) {
                result.push(item.concat(combo));
            }
        }
        return result;
    }

    function *permutations2(arr) {
        if (arr.length <= 1) {
            yield arr;
            return;
        }

        for (let i = 0; i< arr.length; ++i) {
            let item = [arr[i]];
            let rest = arr.remove(i);
            let p = permutations2(rest);
            for (let combo of p) {
                yield item.concat(combo);
            }
        }
    }

    it ('can create permuations with recursion', function(){
        var items = ['milk','soda','eggs','bread'];
        var permuations = permutations1(items);
        expect(permuations.length).toBe(24);
        for (let [v1,v2,v3,v4] of permuations) {
            expect(v1).toBe(items[0]);
            expect(v2).toBe(items[1]);
            expect(v3).toBe(items[2]);
            expect(v4).toBe(items[3]);
            break;
        }
    });

    it ('can create permuations with iterator recursion', function(){
        var items = ['milk','soda','eggs','bread'];
        var permuations = permutations2(items);

        let count = 0;
        for (let [v1,v2,v3,v4] of permuations) {
            //console.log(v1,v2,v3,v4);
            count += 1;
        }
        expect(count).toBe(24);
    });

    //xit is like a disabled test.

    xit ('can solve the Einstein puzzle with iterator permuations', function(){
        /*
         There are five houses.
         The Englishman lives in the red house.
         The Spaniard owns the dog.
         Coffee is drunk in the green house.
         The Ukrainian drinks tea.
         The green house is immediately to the right of the ivory house.
         The Old Gold smoker owns snails.
         Kools are smoked in the yellow house.
         Milk is drunk in the middle house.
         The Norwegian lives in the first house.
         The man who smokes Chesterfields lives in the house next to the man with the fox.
         Kools are smoked in the house next to the house where the horse is kept.
         The Lucky Strike smoker drinks orange juice.
         The Japanese smokes Parliaments.
         The Norwegian lives next to the blue house.
         Now, who drinks water? Who owns the zebra?

         solution:
         The Norwegien drinks the water.  The Japanese owns the zebra

         */

        let five = [1,2,3,4,5];
        let gen = (
            for ([english,spanish,norwegien,japanese,ukranian] of  permutations2(five))
            if (norwegien == 1)

            for ([oldgold,chesterfields,parliaments,kools,luckys] of  permutations2(five))
            if (japanese == parliaments)

            for ([red,green,yellow,blue,ivory] of  permutations2(five))
            if (kools == yellow)
            if (english == red)
            if (green == (ivory + 1))
            if (ivory != 5)
            if (Math.abs(norwegien - blue) == 1)

            for ([dog,fox,zebra,horse,snails] of  permutations2(five))
            if (dog == spanish)
            if (oldgold == snails)
            if (Math.abs(chesterfields - fox) == 1)
            if (Math.abs(kools - horse) == 1)

            for ([coffee,milk,juice,water,tea] of  permutations2(five))
            if (milk == 3)
            if (coffee == green)
            if (tea == ukranian)
            if (luckys == juice)

            {
                Water: water,
                Zebra: zebra,
                Men: new Map([
                                [english,"Englishman"],
                                [spanish,"Spaniard"],
                                [norwegien,"Norwegien"],
                                [japanese,"Japanese"],
                                [ukranian,"Ukranian"]
                            ])
            }
        );

        for (let v of gen) {
            console.log("The %s drinks the water", v.Men.get(v.Water));
            console.log("The %s owns the zebra", v.Men.get(v.Zebra));

            expect(v.Men.get(v.Water)).toEqual("Norwegien");
            expect(v.Men.get(v.Zebra)).toEqual("Japanese");
        }
    });
});


describe('comprehensions', function(){
    it ('should be able to create an array of arrays', function(){
        let arr = [ for (i of [1,2,3,4,5])
                    for (j of ['A','B','C']) if (j != 'B')
                    [i,j,j+i]
            ];

        expect(arr.length).toBe(10);
        expect(arr[0][0]).toBe(1);
        expect(arr[0][1]).toBe('A');
        expect(arr[0][2]).toBe('A1');

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

describe('promises', function(){
    it ('can construct a promise and return data', function(done){
        var promise = new Promise(function(resolve, reject){
            resolve(1);
        });

        promise.then(function(result){
            expect(result).toBe(1);
            done();
        });

    });

    it ('can reject and catch', function(done){
        var promise = new Promise(function(resolve, reject){
            reject(Error("Fail"));
        });

        promise.catch(function(err){
            expect(err.message).toBe("Fail");
            done();
        });

    });

    it ('can resolve with a promise', function(done){
        var previousPromise = new Promise(function(resolve, reject){
            resolve(1);
        });
        var promise = new Promise(function(resolve, reject){
            resolve(previousPromise);
        });

        promise.then(function(data){
            expect(data).toBe(1);
            done();
        });

    });

    it ('should have a static resolve', function(done){
        var promise = Promise.resolve(1);

        promise.then(function(data){
            expect(data).toBe(1);
            done();
        });

    });

    it ('callback in Promise constructor runs async', function(done){

        let async = false;

        var promise = new Promise(function(resolve, reject){
            resolve();
        });

        promise.then(function(){
            expect(async).toBe(true);
            done();
        });

        async = true;
    });

    it ('should chain sequentially', function(done){
        codeLib.getOrder(3).then(function(order){
            return codeLib.getUser(order.userId);
        }).then(function(user){
            return codeLib.getCompany(user.companyId);
        }).then(function(company){
            expect(company.name).toBe("Pluralsight");
            done();
        }).catch(function(err){
            fail("Caught unexpected error: " + (err.message || err));
            done();
        });
    });

    it ('should execute after all promises when using all', function(done){
        let courseIds = [1,2,3];
        let promises = [];
        for (let id of courseIds.values()) {            //Notice that I need Array.values() here
            promises.push(codeLib.getCourse(id));
        }
        Promise.all(promises)
            .then(function(vals) {
                expect(vals.length).toBe(3);
                done();
            });
    });

    it ('should resolve to first when using race', function(done){
        let courseIds = [1,2,3];
        let promises = [];
        for (let id of courseIds.values()) {            //Notice that I need Array.values() here
            promises.push(codeLib.getCourse(id));
        }
        Promise.race(promises)
            .then(function(val) {
                expect(val.name).toBeDefined();
                done();
            });
    });
});