// const userMac = "ef:ef:59:48:3b:29"; // Replace with the MAC address of the device
//const throttleJoy = new JoyStick('throttle-joy');
//const steerJoy = new JoyStick('steer-joy');

const characteristicUUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"; // Characteristic UUID
const serviceID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"; // Service UUID


let bluetoothDevice;
let bluetoothCharacteristic;

let bluetoothAccessor = $state({
  bluetooth: null
});

async function connectToDevice() {
  try {
    // Request a Bluetooth device with the required characteristic
    bluetoothDevice = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      //filters: [{ services: [serviceID] }],
      //optionalServices: [serviceID]
    });

    // Connect to the GATT server
    const server = await bluetoothDevice.gatt.connect();

    // Get the required characteristic
    const service = await server.getPrimaryService(serviceID);
    bluetoothCharacteristic = await service.getCharacteristic(characteristicUUID);

    bluetoothAccessor.bluetooth = {
      device: bluetoothDevice,
      server: server,
      service: service,
      writeCharacteristic: bluetoothCharacteristic
    }
    bluetoothDevice.addEventListener('gattserverdisconnected', () => {
      console.log("Disconnected");
      bluetoothAccessor.bluetooth = null;
    });
    console.log('Connected to Bluetooth device.');
  } catch (error) {
    console.error('Error connecting to Bluetooth device:', error);
  }
}

function disconnectFromDevice() {
  if (!bluetoothDevice) {
    return;
  }
  if (bluetoothDevice.gatt.connected) {
    bluetoothDevice.gatt.disconnect();
  }

  bluetoothAccessor.bluetooth = null;
}


function sendCommand(command) {
  if (bluetoothCharacteristic) {
    const encoder = new TextEncoder();
    const data = encoder.encode(command + ' '); // Add space at the end as requested
    bluetoothCharacteristic.writeValue(data);
    console.log(`Sent command: ${command}`);
  } else {
    console.log('No Bluetooth connection established.');
  }
}

// Event listeners for joystick buttons
/*
document.getElementById('up').addEventListener('click', () => sendCommand('F'));
document.getElementById('down').addEventListener('click', () => sendCommand('B'));
document.getElementById('left').addEventListener('click', () => sendCommand('L'));
document.getElementById('right').addEventListener('click', () => sendCommand('R'));
*/

// Automatically connect to device on page load
// window.onload = () => {
//   connectToDevice();
// };
//
//
export { bluetoothAccessor, connectToDevice, disconnectFromDevice };
