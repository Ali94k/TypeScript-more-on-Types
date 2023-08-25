type Admin = {
  name: string
  privileges: string[]
}

type Employee = {
  name: string
  startDate: Date
}

type ElevatedEmployee = Admin & Employee

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
}

interface IAdmin {
  name: string
  privileges: string[]
}

interface IEmployee {
  name: string
  startDate: Date
}

interface IElevatedEmployee extends IAdmin, IEmployee {}

const e2: IElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
}

type Combinable = string | number
type Numeric = number | boolean

type Universal = Combinable & Numeric

function add(a: Combinable, b: Combinable) {
  //return a + b // error

  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }

  return a + b
}

type UnknownEmployee = Employee | Admin

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name)

  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges)
  }

  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate)
  }
}

printEmployeeInformation({ name: 'Manu', startDate: new Date() })

class Car {
  drive() {
    console.log('Driving...')
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...')
  }

  loadCargo(amount: number) {
    console.log('Loading cargo ...' + amount)
  }
}

type Vehicle = Car | Truck

const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
  vehicle.drive()

  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000)
  }
}

useVehicle(v1)
useVehicle(v2)

interface Bird {
  type: 'bird'
  flyingSpeed: number
}

interface Horse {
  type: 'horse'
  runningSpeed: number
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
  let speed

  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed
      break
    case 'horse':
      speed = animal.runningSpeed
      break
  }

  console.log('Moving at speed: ' + speed)
}

moveAnimal({ type: 'bird', flyingSpeed: 10 })

// Type Casting

const paragraph = document.querySelector('p')

const paragraph2 = document.getElementById('message-output')

const userInput = document.getElementById('user-input')

// userInput.value = 'Hi there!' // error

const userInput2 = <HTMLInputElement>document.getElementById('user-input')!

userInput2.value = 'Hi there!'

const userInput3 = document.getElementById('user-input')! as HTMLInputElement

// Index Properties

interface ErrorContainer {
  // { email: 'Not a valid email', username: 'Must start with a character!' }

  id: string
  [prop: string]: string

  // id: number // error !!!

  // In TypeScript, when you define an object type with an index signature
  // (using [prop: string]: string), it means that the object can have any number of properties
  // of type string with keys of type string. This index signature allows you to add any string-keyed
  // property to the object with its corresponding string value.

  // However, if you also want to have specific properties with predefined keys and types in
  // the same object, like the id property of type number in your case, TypeScript enforces
  // that the predefined properties must be assignable to the index signature type.
  // This is to ensure type safety and consistency.
}

const errorBag: ErrorContainer = {
  id: '123',
  email: 'Not a valid email!',
  username: 'Must start with a capital character!',
}

// Function Overloads

const result = add('37', '5')
// result.split(' ') // error

const result_number = add(1, 5) as number
const result_string = add('Max', ' Schwarz') as string

function add_overload(a: number, b: number): number
function add_overload(a: string, b: string): string
function add_overload(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }

  return a + b
}

const result_overlad = add_overload('3 7 ', '5')
result_overlad.split(' ') // no error

// Optional Chaining ?.?.

const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  job: { title: 'CEO', description: 'My own company' },
}

console.log(fetchedUserData?.job?.title)

// Nullish Coalescing ??

const userInput_nullish = ''

const storedData2 = userInput_nullish || 'DEFAULT' // || if null or undefined or empty string or 0
const storedData = userInput_nullish ?? 'DEFAULT' // ?? only if null or undefined