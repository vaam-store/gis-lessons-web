# **SOLID Principles and Rust-Based Programming**

## **Introduction to SOLID Principles**

The **SOLID** principles are fundamental design principles used in software development to create code that is easy to understand, maintain, and extend. These principles were introduced by **Robert C. Martin (Uncle Bob)** to help developers avoid common pitfalls in software design.

The **goal** of SOLID principles is to make code:

- **Readable** 👀 – Easy to understand for other developers.
- **Maintainable** 🔧 – Simple to modify or fix.
- **Extensible** 🚀 – New features can be added with minimal changes.
- **Efficient** ⚡ – Avoid unnecessary complexity.

### **What Are the SOLID Principles?**

| **Principle**                                 | **Description**                                                                           |
| --------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **S** - Single Responsibility Principle (SRP) | A class/module should do only **one** thing.                                              |
| **O** - Open-Closed Principle (OCP)           | A module should be **open for extension, but closed for modification**.                   |
| **L** - Liskov Substitution Principle (LSP)   | Subclasses should be **replaceable** for their base class without breaking functionality. |
| **I** - Interface Segregation Principle (ISP) | Clients should not be forced to depend on **interfaces they don’t use**.                  |
| **D** - Dependency Inversion Principle (DIP)  | High-level modules should depend on **abstractions**, not concrete implementations.       |

---

## **1. Single Responsibility Principle (SRP)**

### **Concept**

A class or module should have **only one reason to change**. If a class has multiple responsibilities, a change in one feature may break the other.

### **Why SRP Matters**

✅ **Advantages:**

- Improves **code readability**.
- Makes debugging and testing easier.
- Encourages **modular design**.  
  ❌ **Disadvantages if violated:**
- Code becomes difficult to maintain.
- A small change in one responsibility can **affect unrelated functionality**.

### **Rust Example (Bad vs. Good)**

❌ **Bad: Mixing responsibilities in one struct**

```rust
struct Report {
    content: String,
}

impl Report {
    fn generate(&self) -> String {
        format!("Report Content: {}", self.content)
    }

    fn save_to_file(&self, filename: &str) {
        std::fs::write(filename, &self.content).unwrap();
    }
}
```

👎 **Why is this bad?**

- The `Report` struct does **two** things: **generating reports** and **handling file operations**.
- If file handling logic changes, the `Report` struct must also change.

✅ **Good: Separate responsibilities into different structs**

```rust
struct Report {
    content: String,
}

impl Report {
    fn generate(&self) -> String {
        format!("Report Content: {}", self.content)
    }
}

struct FileSaver;

impl FileSaver {
    fn save_to_file(filename: &str, content: &str) {
        std::fs::write(filename, content).unwrap();
    }
}
```

👍 **Why is this better?**

- `Report` only **generates** reports.
- `FileSaver` handles **file operations** separately.

---

## **2. Open-Closed Principle (OCP)**

### **Concept**

Software entities (classes, functions, modules) should be **open for extension but closed for modification**. This means:

- You should be able to **add new functionality** without modifying existing code.
- Achieved through **abstraction** (traits in Rust).

### **Why OCP Matters**

✅ **Advantages:**

- Allows adding features **without breaking existing code**.
- Makes code **scalable and flexible**.  
  ❌ **Disadvantages if violated:**
- Frequent modifications can **introduce bugs**.
- Code becomes **harder to test**.

### **Rust Example (Bad vs. Good)**

❌ **Bad: Hardcoding discount types**

```rust
struct Product {
    price: f64,
}

impl Product {
    fn discounted_price(&self, discount_type: &str) -> f64 {
        if discount_type == "Black Friday" {
            self.price * 0.8
        } else if discount_type == "Christmas" {
            self.price * 0.9
        } else {
            self.price
        }
    }
}
```

👎 **Why is this bad?**

- Each time a new discount is introduced, we must **modify** this function.
- If another developer forgets to update it, **bugs** may occur.

✅ **Good: Use traits for flexibility**

```rust
trait Discount {
    fn apply(&self, price: f64) -> f64;
}

struct BlackFriday;
impl Discount for BlackFriday {
    fn apply(&self, price: f64) -> f64 {
        price * 0.8
    }
}

struct Christmas;
impl Discount for Christmas {
    fn apply(&self, price: f64) -> f64 {
        price * 0.9
    }
}

fn get_discounted_price<D: Discount>(price: f64, discount: D) -> f64 {
    discount.apply(price)
}
```

👍 **Why is this better?**

- New discount types can be added **without modifying existing code**.
- Promotes **code reusability**.

---

## **3. Liskov Substitution Principle (LSP)**

### **Concept**

A subclass should be **substitutable** for its base class **without altering the correctness** of the program.

This means:

- If class `B` is a subclass of class `A`, you should be able to replace `A` with `B` without breaking anything.
- **A derived class must not remove behavior expected from the base class.**

### **Why LSP Matters**

✅ **Advantages:**

- Prevents unexpected bugs when using polymorphism.
- Helps ensure **consistent behavior** across derived classes.  
  ❌ **Disadvantages if violated:**
- Some subclasses may **remove expected functionality** (which can break the program).

### **Rust Example (Bad vs. Good)**

❌ **Bad: Violating LSP by altering behavior**

```rust
struct Bird;

impl Bird {
    fn fly(&self) {
        println!("I can fly!");
    }
}

struct Penguin;

impl Penguin {
    fn fly(&self) {
        panic!("Penguins can't fly!");
    }
}
```

👎 **Why is this bad?**

- `Penguin` **inherits the concept** of "bird" but **changes the expected behavior**.
- If we replace `Bird` with `Penguin`, the program **crashes**.

✅ **Good: Use a trait to ensure valid behavior**

```rust
trait Flyer {
    fn fly(&self);
}

struct Sparrow;
impl Flyer for Sparrow {
    fn fly(&self) {
        println!("Sparrow is flying.");
    }
}

struct Penguin;
impl Penguin {
    fn swim(&self) {
        println!("Penguin is swimming.");
    }
}
```

👍 **Why is this better?**

- `Sparrow` implements `Flyer`, ensuring **expected behavior**.
- `Penguin` does **not** implement `Flyer`, so it won’t be misused.

---

## **4. Interface Segregation Principle (ISP)**

### **Concept**

A class or module should **not be forced to implement interfaces** it does not use.

- Large interfaces should be **split into smaller, more specific ones**.
- This prevents **unnecessary dependencies** and **keeps implementations clean**.

### **Why ISP Matters**

✅ **Advantages:**

- Prevents **bloated interfaces**.
- Each implementation only depends on **what it actually needs**.  
  ❌ **Disadvantages if violated:**
- Unused methods **clutter** the code.
- Changes to an interface **affect unrelated classes**.

### **Rust Example (Bad vs. Good)**

❌ **Bad: One large trait with unrelated methods**

```rust
trait Worker {
    fn work(&self);
    fn eat(&self);
}

struct Robot;
impl Worker for Robot {
    fn work(&self) {
        println!("Robot is working.");
    }

    fn eat(&self) {
        panic!("Robots don’t eat!");
    }
}
```

👎 **Why is this bad?**

- `Robot` has to implement `eat()`, which **does not make sense**.

✅ **Good: Split interfaces into meaningful traits**

```rust
trait Work {
    fn work(&self);
}

trait Eat {
    fn eat(&self);
}

struct Human;
impl Work for Human {
    fn work(&self) {
        println!("Human is working.");
    }
}

impl Eat for Human {
    fn eat(&self) {
        println!("Human is eating.");
    }
}

struct Robot;
impl Work for Robot {
    fn work(&self) {
        println!("Robot is working.");
    }
}
```

👍 **Why is this better?**

- `Robot` **only** implements `Work`, **not** `Eat`.
- `Human` implements **both** because it makes sense.

---

## **5. Dependency Inversion Principle (DIP)**

### **Concept**

High-level modules should **not depend on low-level modules**. Instead, both should depend on **abstractions**.

- This makes systems **more flexible and less coupled**.
- Achieved using **traits (interfaces) in Rust**.

### **Why DIP Matters**

✅ **Advantages:**

- Makes **code easier to extend**.
- Reduces **tight coupling** between components.  
  ❌ **Disadvantages if violated:**
- Harder to modify code because of **direct dependencies**.

### **Rust Example (Bad vs. Good)**

❌ **Bad: High-level module depends on a concrete implementation**

```rust
struct FileLogger;

impl FileLogger {
    fn log(&self, message: &str) {
        println!("Logging to file: {}", message);
    }
}

struct Application {
    logger: FileLogger,
}

impl Application {
    fn run(&self) {
        self.logger.log("Application started.");
    }
}
```

👎 **Why is this bad?**

- `Application` **directly depends** on `FileLogger`.
- If we want to **use another logger (e.g., ConsoleLogger)**, we need to **modify Application**.

✅ **Good: Use a trait (abstraction) for logging**

```rust
trait Logger {
    fn log(&self, message: &str);
}

struct FileLogger;
impl Logger for FileLogger {
    fn log(&self, message: &str) {
        println!("Logging to file: {}", message);
    }
}

struct ConsoleLogger;
impl Logger for ConsoleLogger {
    fn log(&self, message: &str) {
        println!("Console Log: {}", message);
    }
}

struct Application<L: Logger> {
    logger: L,
}

impl<L: Logger> Application<L> {
    fn run(&self) {
        self.logger.log("Application started.");
    }
}
```

👍 **Why is this better?**

- `Application` depends on the **Logger trait**, not a specific implementation.
- We can **switch loggers** without modifying `Application`.

---

## **Exercises for Students**

Each exercise should be solved using Rust, following the respective SOLID principle.

### **Exercise 1: Apply SRP (Single Responsibility Principle)**

#### **Problem Statement**

You are designing a **User Management System** where:

- `User` struct should **store** user data.
- `EmailService` struct should **handle email notifications**.
- **Do not mix responsibilities** in a single struct.

#### **Tasks**

1. Create a `User` struct with `name` and `email`.
2. Create an `EmailService` struct with a method `send_email`.
3. Ensure that `User` does not handle email operations directly.

---

### **Exercise 2: Apply OCP (Open-Closed Principle)**

#### **Problem Statement**

You are working on a **Payment Processing System** that supports different payment methods (e.g., **CreditCard**, **PayPal**).

- Instead of modifying the existing payment logic when adding a new method, use **traits** to make the system extendable.

#### **Tasks**

1. Define a `PaymentMethod` trait with a method `process_payment()`.
2. Implement `PaymentMethod` for `CreditCard` and `PayPal`.
3. Allow users to make a payment without modifying existing structs.

---

### **Exercise 3: Apply DIP (Dependency Inversion Principle)**

#### **Problem Statement**

You are building a **Logger System** that supports different logging methods (**FileLogger**, **ConsoleLogger**).

- Instead of depending on concrete implementations, your system should depend on **abstractions** (traits).

#### **Tasks**

1. Create a `Logger` trait with a method `log()`.
2. Implement `Logger` for `FileLogger` and `ConsoleLogger`.
3. Ensure a `System` struct depends on `Logger`, not a specific implementation.

---

### **Exercise 4: Apply LSP (Liskov Substitution Principle)**

#### **Problem Statement**

You are designing a **Shape System** where:

- A `Rectangle` has a `width` and `height`.
- A `Square` has only **one** size (width == height).

#### **Tasks**

1. Create a `Shape` trait with a method `area()`.
2. Implement `Shape` for `Rectangle` and `Square`.
3. Ensure `Square` does not **break expected behavior**.

---

### **Exercise 5: Apply ISP (Interface Segregation Principle)**

#### **Problem Statement**

You are working on a **Media Player** system where:

- `AudioPlayer` can **play audio** but **not video**.
- `VideoPlayer` can **play both audio and video**.

#### **Tasks**

1. Define separate traits: `AudioPlayable` and `VideoPlayable`.
2. Implement **only relevant traits** for `AudioPlayer` and `VideoPlayer`.
3. Ensure `AudioPlayer` **does not depend** on video functionality.

---

### **Exercise 6: Apply DIP (Dependency Inversion Principle)**

#### **Problem Statement**

You are building a **Notification System** where:

- Users can receive notifications via **Email** or **SMS**.
- `NotificationService` should **not depend** on concrete implementations of Email or SMS.

#### **Tasks**

1. Define a `Notifier` trait with `send_notification()`.
2. Implement `Notifier` for `EmailNotifier` and `SMSNotifier`.
3. Ensure `NotificationService` depends on the `Notifier` trait instead of a concrete class.

---

## **Final Thoughts**

By following SOLID principles, your Rust programs will be:  
✅ **More readable** ✅ **Easier to maintain** ✅ **Scalable** ✅ **Less error-prone**

## **Conclusion**

The **SOLID** principles help developers write **better, more maintainable** Rust code. By following these principles, you can:  
✅ Improve **code structure** and **reusability**.  
✅ Avoid **modifying existing code** for new features.  
✅ Make your programs **scalable and flexible**.
