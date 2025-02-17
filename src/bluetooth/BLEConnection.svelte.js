// const serviceID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"; // Service UUID
// const characteristicUUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"; // Characteristic UUID

const serviceID =  "b212f5e6-2679-30da-a26e-0273b6043849";
const characteristicUUID = "b212f5e6-2679-30da-a26e-0273b6043849";

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
      optionalServices: [serviceID]
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



export { bluetoothAccessor, connectToDevice, disconnectFromDevice };
