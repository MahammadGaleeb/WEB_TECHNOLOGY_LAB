// Import the built-in file system module using require()
const fs = require('fs');
const path = require('path');

// Define working directory and sample filenames
const WORKING_DIR = './files';
const SAMPLE_FILE = 'sample.txt';
const LOG_FILE = 'app.log';
const DATA_FILE = 'data.json';

// Ensure working directory exists
if (!fs.existsSync(WORKING_DIR)) {
    fs.mkdirSync(WORKING_DIR);
    console.log(`📁 Created working directory: ${WORKING_DIR}`);
}

// Full paths for files
const sampleFilePath = path.join(WORKING_DIR, SAMPLE_FILE);
const logFilePath = path.join(WORKING_DIR, LOG_FILE);
const dataFilePath = path.join(WORKING_DIR, DATA_FILE);

// Utility function to log operations with timestamps
function logOperation(message) {
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}] ${message}`);
}

// 1. CREATE FILE using fs.writeFile()
function createFile() {
    logOperation('🚀 Starting file creation...');
    
    fs.writeFile(sampleFilePath, 'Hello, Node.js File System!\nThis is a sample file created with fs.writeFile().', (error) => {
        if (error) {
            console.error('❌ Error creating file:', error.message);
            return;
        }
        logOperation(`✅ File created successfully: ${SAMPLE_FILE}`);
        readFile(); // Chain to next operation
    });
}

// 2. READ FILE using fs.readFile()
function readFile() {
    logOperation('📖 Reading file contents...');
    
    fs.readFile(sampleFilePath, 'utf8', (error, data) => {
        if (error) {
            console.error('❌ Error reading file:', error.message);
            return;
        }
        logOperation(`📄 File contents (${SAMPLE_FILE}):\n${data}`);
        appendToFile(); // Chain to next operation
    });
}

// 3. APPEND DATA using fs.appendFile()
function appendToFile() {
    logOperation('➕ Appending data to file...');
    
    const newContent = `\n\n--- Appended Content ---\nTimestamp: ${new Date().toISOString()}\nAppended using fs.appendFile()`;
    
    fs.appendFile(sampleFilePath, newContent, (error) => {
        if (error) {
            console.error('❌ Error appending to file:', error.message);
            return;
        }
        logOperation(`✅ Data appended successfully to ${SAMPLE_FILE}`);
        readFileAfterAppend(); // Chain to verify
    });
}

// Verify append operation by reading file again
function readFileAfterAppend() {
    fs.readFile(sampleFilePath, 'utf8', (error, data) => {
        if (error) {
            console.error('❌ Error reading file after append:', error.message);
            return;
        }
        logOperation(`📄 File after append (${SAMPLE_FILE}):\n${data}`);
        createJsonFile(); // Chain to next operation
    });
}

// 4. CREATE JSON FILE using fs.writeFile()
function createJsonFile() {
    logOperation('📝 Creating JSON data file...');
    
    const userData = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        timestamp: new Date().toISOString(),
        operations: ["create", "read", "append"]
    };
    
    fs.writeFile(dataFilePath, JSON.stringify(userData, null, 2), (error) => {
        if (error) {
            console.error('❌ Error creating JSON file:', error.message);
            return;
        }
        logOperation(`✅ JSON file created: ${DATA_FILE}`);
        readJsonFile(); // Chain to next operation
    });
}

// 5. READ JSON FILE
function readJsonFile() {
    logOperation('📊 Reading JSON file...');
    
    fs.readFile(dataFilePath, 'utf8', (error, data) => {
        if (error) {
            console.error('❌ Error reading JSON file:', error.message);
            return;
        }
        
        try {
            const jsonData = JSON.parse(data);
            logOperation(`✅ JSON data: ${JSON.stringify(jsonData, null, 2)}`);
        } catch (parseError) {
            console.error('❌ JSON parse error:', parseError.message);
        }
        
        createLogFile(); // Chain to next operation
    });
}

// 6. CREATE LOG FILE with multiple operations
function createLogFile() {
    logOperation('📋 Creating application log file...');
    
    const logEntry = `[${new Date().toISOString()}] File Manager Demo Started\n`;
    
    fs.writeFile(logFilePath, logEntry, (error) => {
        if (error) {
            console.error('❌ Error creating log file:', error.message);
            return;
        }
        logOperation(`✅ Log file created: ${LOG_FILE}`);
        appendLogEntry(); // Chain to demonstrate append
    });
}

// 7. APPEND TO LOG FILE
function appendLogEntry() {
    const logEntry = `[${new Date().toISOString()}] All file operations completed successfully!\n`;
    
    fs.appendFile(logFilePath, logEntry, (error) => {
        if (error) {
            console.error('❌ Error appending to log:', error.message);
            return;
        }
        logOperation(`✅ Log entry appended`);
        listDirectory(); // Chain to next operation
    });
}

// 8. LIST DIRECTORY CONTENTS
function listDirectory() {
    logOperation('📂 Listing directory contents...');
    
    fs.readdir(WORKING_DIR, (error, files) => {
        if (error) {
            console.error('❌ Error reading directory:', error.message);
            return;
        }
        logOperation(`📁 Files in ${WORKING_DIR}:\n${files.map(f => `  - ${f}`).join('\n')}`);
        deleteFile(); // Chain to next operation
    });
}

// 9. DELETE FILE using fs.unlink()
function deleteFile() {
    logOperation('🗑️  Deleting sample file...');
    
    fs.unlink(sampleFilePath, (error) => {
        if (error) {
            console.error('❌ Error deleting file:', error.message);
        } else {
            logOperation(`✅ File deleted successfully: ${SAMPLE_FILE}`);
        }
        checkFileExists(); // Chain to verify deletion
    });
}

// 10. CHECK IF FILE EXISTS
function checkFileExists() {
    logOperation('🔍 Verifying file deletion...');
    
    fs.access(sampleFilePath, fs.constants.F_OK, (error) => {
        if (error) {
            logOperation(`✅ ${SAMPLE_FILE} confirmed deleted (does not exist)`);
        } else {
            logOperation(`⚠️  ${SAMPLE_FILE} still exists`);
        }
        showFinalStatus(); // Final operation
    });
}

// 11. FINAL STATUS SUMMARY
function showFinalStatus() {
    logOperation('🏁 FINAL STATUS SUMMARY');
    logOperation('✅ All file operations completed successfully!');
    logOperation('📁 Check the ./files directory for remaining files:');
    
    fs.readdir(WORKING_DIR, (error, files) => {
        if (!error && files.length > 0) {
            logOperation(`📄 Remaining files:\n${files.map(f => `   ${f}`).join('\n')}`);
        }
        logOperation('🎉 File Manager Demo Complete!');
        logOperation('='.repeat(60));
    });
}

// Main execution flow - Start the chain of operations
function runFileManagerDemo() {
    console.log('🚀 Node.js File System Manager Demo');
    console.log('='.repeat(60));
    
    // Start the asynchronous chain
    createFile();
}

// Error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error.message);
    process.exit(1);
});

// Run the demo when script is executed
runFileManagerDemo();