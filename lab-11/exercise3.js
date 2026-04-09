// Import the built-in events module using require()
const EventEmitter = require('events').EventEmitter;

// Create custom classes that extend EventEmitter
class UserManager extends EventEmitter {}
class OrderProcessor extends EventEmitter {}
class NotificationService extends EventEmitter {}

// Create instances of event emitters
const userManager = new UserManager();
const orderProcessor = new OrderProcessor();
const notificationService = new NotificationService();

// ========================================
// 1. USER MANAGEMENT EVENTS
// ========================================

logEvent('🚀 Starting Event-Driven Demo...');
logEvent('='.repeat(70));

// Register multiple listeners for 'userRegistered' event
userManager.on('userRegistered', (userData) => {
    logEvent(`✅ [Listener 1] New user registered: ${userData.name} (${userData.email})`);
    logEvent(`   ID: ${userData.id}, Age: ${userData.age}`);
});

userManager.on('userRegistered', (userData) => {
    logEvent(`📧 [Listener 2] Welcome email sent to: ${userData.email}`);
});

userManager.on('userRegistered', (userData) => {
    logEvent(`💾 [Listener 3] User data saved to database: ${userData.id}`);
});

// Handle 'userLogin' event with data
userManager.on('userLogin', (sessionData) => {
    logEvent(`🔐 [LOGIN] User logged in: ${sessionData.username}`);
    logEvent(`   Session ID: ${sessionData.sessionId}`);
    logEvent(`   IP: ${sessionData.ip}, Time: ${sessionData.timestamp}`);
});

// Handle 'userLogout' event
userManager.on('userLogout', (username) => {
    logEvent(`👋 [LOGOUT] User logged out: ${username}`);
});

// ========================================
// 2. ORDER PROCESSING EVENTS
// ========================================

// Multiple listeners for order events
orderProcessor.on('orderPlaced', (order) => {
    logEvent(`🛒 [Order #${order.id}] Order placed by ${order.customer}`);
    logEvent(`   Total: $${order.total}, Items: ${order.items.length}`);
});

orderProcessor.on('orderPlaced', (order) => {
    logEvent(`📦 [Processing] Preparing order #${order.id} for shipment...`);
});

orderProcessor.on('orderPlaced', (order) => {
    // Simulate async processing delay
    setTimeout(() => {
        logEvent(`✅ [Payment] Order #${order.id} payment processed successfully`);
        orderProcessor.emit('orderProcessed', order);
    }, 1000);
});

// Chain events - orderProcessed triggers next steps
orderProcessor.on('orderProcessed', (order) => {
    logEvent(`🚚 [Shipping] Order #${order.id} shipped to ${order.address}`);
    notificationService.emit('orderShipped', order);
});

// ========================================
// 3. NOTIFICATION SERVICE EVENTS
// ========================================

notificationService.on('orderShipped', (order) => {
    logEvent(`📱 [SMS] Tracking info sent for order #${order.id}`);
});

notificationService.on('orderShipped', (order) => {
    logEvent(`📧 [Email] Shipping confirmation sent to ${order.customer}`);
});

// ========================================
// 4. ERROR HANDLING EVENTS
// ========================================

// Handle errors globally
userManager.on('error', (error) => {
    logError(`💥 UserManager Error: ${error.message}`);
});

orderProcessor.on('error', (error) => {
    logError(`💥 OrderProcessor Error: ${error.message}`);
});

// Generic error event for any emitter
const handleGenericError = (error) => {
    logError(`⚠️  Generic Error: ${error.message}`);
    logEvent('🔄 System continuing operation...');
};

// ========================================
// 5. ONCE EVENT - Executes only once
// ========================================

userManager.once('firstUser', (user) => {
    logEvent(`🎉 [FIRST USER SPECIAL] Welcome ${user.name}! You get 50% off your first order!`);
});

// ========================================
// 6. UTILITY FUNCTIONS
// ========================================

function logEvent(message) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${message}`);
}

function logError(message) {
    const timestamp = new Date().toLocaleTimeString();
    console.red = () => ''; // Simple color simulation
    console.log(`\x1b[31m[${timestamp}] ${message}\x1b[0m`); // Red color
}

// ========================================
// 7. DEMONSTRATION SEQUENCE
// ========================================

logEvent('🎬 Starting demonstration sequence...');

setTimeout(() => {
    // Trigger first user special event (ONCE only)
    userManager.emit('firstUser', { name: 'Alice Johnson', email: 'alice@example.com' });
}, 500);

setTimeout(() => {
    // Trigger regular user registration (multiple listeners)
    userManager.emit('userRegistered', {
        id: 123,
        name: 'Bob Smith',
        email: 'bob@example.com',
        age: 28
    });
}, 1500);

setTimeout(() => {
    // User login sequence
    userManager.emit('userLogin', {
        username: 'Bob Smith',
        sessionId: 'sess_abc123',
        ip: '192.168.1.100',
        timestamp: new Date().toISOString()
    });
}, 3000);

setTimeout(() => {
    // Order processing chain
    orderProcessor.emit('orderPlaced', {
        id: 1001,
        customer: 'Bob Smith',
        total: 89.99,
        items: ['Laptop', 'Mouse', 'Keyboard'],
        address: '123 Main St, City, State 12345'
    });
}, 4500);

setTimeout(() => {
    // Simulate error
    userManager.emit('error', new Error('Database connection failed temporarily'));
}, 6500);

setTimeout(() => {
    // User logout
    userManager.emit('userLogout', 'Bob Smith');
}, 7500);

// Demonstrate event counting and removal
setTimeout(() => {
    logEvent('\n📊 Event Statistics:');
    logEvent(`userRegistered listeners: ${userManager.listenerCount('userRegistered')}`);
    logEvent(`userLogin listeners: ${userManager.listenerCount('userLogin')}`);
    
    // Remove all listeners for userRegistered
    userManager.removeAllListeners('userRegistered');
    logEvent(`userRegistered listeners after removal: ${userManager.listenerCount('userRegistered')}`);
    
    logEvent('\n🔄 Triggering userRegistered again (no listeners)...');
    userManager.emit('userRegistered', { name: 'Charlie', email: 'charlie@test.com' });
}, 8500);

// Final completion
setTimeout(() => {
    logEvent('\n🏁 Event-Driven Demo Complete!');
    logEvent('='.repeat(70));
    logEvent('✅ All requirements demonstrated:');
    logEvent('   • EventEmitter instance created');
    logEvent('   • Custom events emitted with data');
    logEvent('   • Multiple listeners per event');
    logEvent('   • Event chaining & async behavior');
    logEvent('   • Error handling & once() events');
    logEvent('   • Listener management');
    
    process.exit(0);
}, 10500);