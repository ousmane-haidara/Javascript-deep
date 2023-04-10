// Import stylesheets
import './style.css';
import './myInfos.js';

console.clear();

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

let initialValue = '5';

//++initialValue

let increment = ++initialValue;

console.log('increment', increment);

//undeclared vs undefined

// NaN - isNaN => veut dire nombre invalide
const testNaN = Number('1A');
console.log('testNan', testNaN === testNaN); //false Oops
console.log('test', typeof testNaN); // number
console.log('isNaN String', isNaN('my string')); //true Oops, pas utilisé isNaN
console.log('test Number.isNaN', Number.isNaN('my string'));

// Negative zero

const sign = (v) => {
  return v !== 0 ? Math.sign(v) : Object.is(v, -0) ? -1 : 1;
};

console.log('sign', sign(-0));

// TODO: define polyfill for `Object.is(..)`

if (!Object.is) {
  Object.is = function ObjectIs(x, y) {
    var xNegZero = isItNegZero(x);
    var yNegZero = isItNegZero(y);

    if (xNegZero || yNegZero) {
      return xNegZero && yNegZero;
    } else if (isItNaN(x) && isItNaN(y)) {
      return true;
    } else if (x === y) {
      return true;
    }

    return false;

    // **********

    function isItNegZero(x) {
      return x === 0 && 1 / x === -Infinity;
    }

    function isItNaN(x) {
      return x !== x;
    }
  };
}

// tests:
/***console.log(Object.is(42, 42) === true);
console.log(Object.is('foo', 'foo') === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, '42') === false);
console.log(Object.is('42', 42) === false);
console.log(Object.is('foo', 'bar') === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false); ***/

console.log('abstract Equality', null == undefined);

const object1 = {
  name: 'test object',
};
const object2 = {
  name: 'test object',
};

console.log('test comparaison Object', object1 === object2);

// To Primitive

let user = {
  name: 'John',
  money: 1000,

  [Symbol.toPrimitive](hint) {
    // call this to convert obj to primitive
    console.log(`hint: ${hint}`);
    return hint == 'string' ? `{name: "${this.name}"}` : this.money;
  },
};

// conversions demo:
//alert(user); // hint: string -> {name: "John"}
console.log(+user); // hint: number -> 1000
console.log(user + 500); // hint: default -> 1500

console.log('user', user.valueOf());
console.log('user = user.valueOf', user.valueOf() === user);
console.log('user', user.toString());

user = {
  name: 'John',
  money: 1000,

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint="number" or "default"
  valueOf() {
    return this.money;
  },
};

//alert(user); // hint: string -> {name: "John"}
console.log(+user); // hint: number -> 1000
console.log(user + 500); // hint: default -> 1500

console.log('user valueOf', user.valueOf());
console.log('user = user.valueOf', user.valueOf() === user);
console.log('user toString', user.toString());

const works1 = 42;
const works2 = [42];

console.log('test coervive Equality', works1 == works2); // ne pas utiliser les doubles égales

// == Resumé

/**
 *  If the types are the same: ===
 * if null or undefined: equal (true)
 * if non-primitives: ToPrimitive
 * Prefer: ToNumber
 */

console.log('wat!?', [] == ![]); // => [] == !true (Boolean([]) = true) => [] == false => "" == false => 0 === 0 => true
console.log('wat!? v2', [] != []); // => !([] == []) => !([] === []) => !(false) => true
console.log('boolean case, wat!?', [] == true); // => [] == 1 => "" == 1 => 0 === 1 => false
console.log('boolean case, wat!?', [] == false); // => [] == 0 => "" == 0 => 0 === 0 => true

/** Avoid
 * == with 0 or "" (or event " ")
 * == with non-primitives
 * == true or == false : allow ToBoolean or use ===
 */

// The case for Preferring ==

//typescript

const arrayTest = [1, 2, 3];

console.log('array before', arrayTest);

//const firstEl = [...arrayTest].shift()
//console.log('first', firstEl)

//const lastEl = [...arrayTest].pop();
//console.log('last', lastEl);

console.log('array after', arrayTest);

/** *********************** Javascript Scope ***************************** */
console.clear();

function testScopeJs() {
  //#ffff
  var teacher = 'kyle';
  function otherClass() {
    teacher = 'Suzy';
    topic = 'React';
    console.log('Welcome!');
  }

  otherClass();

  console.log('teacher', teacher);
  console.log('topic', topic);
}

//testScopeJs()

// undefined vs undeclared
/**
 * undefined: pas de valeur à cet instant
 * undeclared: jamais de valeur dans tous les scopes que le compilateur parcours
 */

var x = function foo() {
  var y = foo();
};
/**
 * x is global scope
 * foo is global scope
 * y is foo function scope
 */

// Function Scoping

function test() {
  var teacher = 'ousmane';

  var teacher = 'HAIDARA'; // pour éviter d'ecraser teacher , on peut le mettre dans une fonction

  console.log('teacher', teacher);
}

//test()

function test2() {
  var teacher = 'ousmane';

  {
    // C'est un block car on a au moins un let/const à l'intéreur
    let teacher = 'HAIDARA';

    console.log('teacher', teacher);
  }

  console.log('teacher', teacher);
}

//test2()

//chose between let and var
function repeat(fn, n) {
  var result;

  for (let i = 0; i < n; i++) {
    result = fn(result, i);

    if (i !== 0 && i % 2 === 0) {
      console.log(i, result);
    }
  }
  console.log('result', result);
  return result;
}

const fn = function (x, y) {
  return x + y;
};

//repeat(fn, 3);

// on utilise let pour bloquer la portée  de la variable ( seulement ) let a une porté bloc
// var pour une portée global ou function

function lookupRecord(searchStr, fn) {
  try {
    var id = fn(searchStr);
  } catch (err) {
    var id = -1;
  }
  return id;
} // to test , try to change var in

// const => une variable qui ne peut pas être reasignéé

function testConst() {
  var teacher = 'Ousmane';
  teacher = 'HAIDARA'; // => OK

  const myTeacher = teacher;
  myTeacher = 'HAIDARA'; // => typeError

  const teachers = ['Ousmane', 'HAIDARA'];
  teachers[1] = 'OusDev'; // => Allowed!
}

//Conclure sur l'utilisation de var/let/const : vous devriez utiliser par default var , utilisez
// let là oû c'est utile , utilisez const avec parcimonie uniquement avec valeurs primitives immuables.
