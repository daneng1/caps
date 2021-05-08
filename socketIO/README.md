# Caps Project

> This project uses event driven development to track packages for CAPS(Code Academy(CodeFellows?) Parcel Shipping) from the moment the order is received until when it is delivered. This project will deliver real-time data for every milestone in the delivery process.

## Howe to use this app

- open four terminal windows and navigate to vendor, server-queue, driver and caps
- run  `node server-queue.js`to start the server
- run `node driver.js` to start the driver
- run `node vendor.js` to start the vendor and kick off orders
- run `node caps.js` to start Caps delivery service. This one will clear out the server-queue when you start it. It will also clear it out while it is running.

### User Stories

1. As a vendor, I want to alert the system when I have a package to be picked up
1. As a driver, I want to be notified when there is a package to be delivered
1. As a driver, I want to alert the system when I have picked up a package and it is in transit
1. As a driver, I want to alert the system when a package has been delivered
1. As a vendor, I want to be notified when my package has been delivered
1. As a developer, I want to use industry standards for managing the state of each package
1. As a developer, I want to create an event driven system so that I can write code that happens in response to events, in real time

## Phase 1: Event Driven Applications

> Using built-in Node.js events to simulate realtime package delivery changes

## Phase 2: Continue working on a multi-day build of our delivery tracking system, moving event management to socket.io

> In this phase, we’ll be moving away from using TCP for our event network and switching instead in to using socket.io, which takes on some of the complexity we had to manage ourselves, and also works equally well between servers and with websites.

- The intent here is to build the data services that would drive full dashboard where we can see pickups and deliveries as they happen.

## Phase 3:Message Queue

> In this phase, we’ll be adding a layer of complexity to our application. Rather than just “fire” events and hope that our vendors and drivers respond to them, we’re going to implement a “queue” system so that nothing gets lost. Every event sent will be logged and held onto by the server until the intended recipient acknowledges that they received the message. At any time, a subscriber can get all of the messages they might have missed.

## Technical Requirements

- events.js - Global Event Pool (shared by all modules)
- caps.js - Main Hub Application
  - Manages the state of every package (ready for pickup, in transit, delivered, etc)
  - Logs every event to the console with a timestamp and the event payload i.e. “EVENT {}”
- vendor.js - Vendor Module
  - Declare your store name (perhaps in a .env file, so that this module is re-usable)
  - Every 5 seconds, simulate a new customer order
  - Create a fake order, as an object:
    - storeName, orderId, customerName, address
  - Emit a ‘pickup’ event and attach the fake order as payload
  - Monitor the system for events …
  - Whenever the ‘delivered’ event occurs Log “thank you” to the console
- driver.js - Drivers Module
  - Monitor the system for events …
  - On the ‘pickup’ event …
    - Wait 1 second
    - Log “DRIVER: picked up [ORDER_ID]” to the console.
    - Emit an ‘in-transit’ event with the payload you received
  - Wait 3 seconds
  - Log “delivered” to the console
  - Emit a ‘delivered’ event with the same payload
- A Queue Server Hub that
  - Keeps a log of the delivery, keyed by retailer and event type
  - Broadcasts “Delivery Confirmations” to retailers
- Client (Vendor) Applications that retailers would run, which subscribe to the Queue so that they can be alerted when a delivery was made
  - When a client receives a message, it will need to let the hub server know that it was received
  - The hub server should then delete the message
  - Client can ask for all undelivered messages from the server
  - Each of these would also need to be acknowledged upon receipt

## Approach & Efficiency

- My approach was to begin by mapping out the process of the package and determine where the key touch points live in the process. Once I knew that, then I could start to build the events and communication between CAPS, the vendor and the driver.

---

![Whiteboard](caps.png)
![Whiteboard-2](caps-phase3.png)