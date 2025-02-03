### **Title: SOLID Principles in Rust**

### **Slide 1: Title Slide**

- **Title:** SOLID Principles in Rust
- **Subtitle:** Writing Maintainable and Scalable Code
- **GIS Training - Phase II**

---

### **Slide 2: Introduction to SOLID**

- SOLID is a set of five design principles for writing maintainable software.
- Originally formulated for Object-Oriented Programming (OOP) but applies to Rust as well.
- Improves **readability, maintainability, and efficiency** of code.

---

### **Slide 3: Why Use SOLID?**

- Reduces code complexity.
- Makes code easier to test and extend.
- Helps in collaboration and long-term maintenance.
- Prevents bugs due to rigid or interdependent code.

---

### **Slide 4: Overview of SOLID**

- **S** – Single Responsibility Principle (SRP)
- **O** – Open/Closed Principle (OCP)
- **L** – Liskov Substitution Principle (LSP)
- **I** – Interface Segregation Principle (ISP)
- **D** – Dependency Inversion Principle (DIP)

---

### **Slide 5: Single Responsibility Principle (SRP)**

**Definition:** A module/class should have **only one reason to change**.  
**Example:** Separate **logging** from **business logic** in a banking app.

```rust
struct Logger;
impl Logger {
    fn log(&self, message: &str) {
        println!("LOG: {}", message);
    }
}

struct PaymentProcessor {
    logger: Logger,
}
impl PaymentProcessor {
    fn process_payment(&self, amount: f64) {
        self.logger.log(&format!("Processing payment of ${}", amount));
    }
}
```

---

### **Slide 6: Open/Closed Principle (OCP)**

**Definition:** Software entities should be **open for extension but closed for modification**.  
**Example:** Adding new shapes **without modifying existing code**.

```rust
trait Shape {
    fn area(&self) -> f64;
}

struct Circle {
    radius: f64,
}
impl Shape for Circle {
    fn area(&self) -> f64 {
        3.14 * self.radius * self.radius
    }
}

struct Rectangle {
    width: f64,
    height: f64,
}
impl Shape for Rectangle {
    fn area(&self) -> f64 {
        self.width * self.height
    }
}
```

---

### **Slide 7: Liskov Substitution Principle (LSP)**

**Definition:** Derived classes should be **substitutable** for their base classes **without altering expected behavior**.  
**Example:** `Penguin` should not inherit `Bird` if it cannot fly.

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

---

### **Slide 8: Interface Segregation Principle (ISP)**

**Definition:** A client should **not be forced** to depend on interfaces it **does not use**.  
**Example:** Splitting a bloated `Worker` interface.

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

---

### **Slide 9: Dependency Inversion Principle (DIP)**

**Definition:** High-level modules should **not depend on low-level modules**, but on **abstractions**.  
**Example:** A `NotificationService` should depend on a `Notifier` trait, not on a concrete `EmailNotifier`.

```rust
trait Notifier {
    fn send_notification(&self, message: &str);
}

struct EmailNotifier;
impl Notifier for EmailNotifier {
    fn send_notification(&self, message: &str) {
        println!("Sending email: {}", message);
    }
}

struct NotificationService<N: Notifier> {
    notifier: N,
}
impl<N: Notifier> NotificationService<N> {
    fn notify(&self, message: &str) {
        self.notifier.send_notification(message);
    }
}
```

---

### **Slide 10: Exercises**

1. **SRP:** Refactor a `UserService` that handles **user data + email notifications** into separate modules.
2. **OCP:** Implement a new `Triangle` shape **without modifying** the existing shape module.
3. **LSP:** Ensure `Square` correctly extends `Rectangle` **without breaking behavior**.
4. **ISP:** Redesign an overloaded `MediaPlayer` interface so `AudioPlayer` doesn't depend on video functionality.
5. **DIP:** Implement a `PaymentGateway` that supports both `PayPal` and `Stripe`, using a common trait.

---

### **Slide 11: Conclusion**

- SOLID makes Rust code more **modular, scalable, and testable**.
- Helps in **team collaboration** and **long-term maintainability**.
- Encourages **good software architecture practices**.

**Any Questions?** 🚀
