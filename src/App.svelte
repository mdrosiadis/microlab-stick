<script>
  import "./app.css";
  import BluetoothConnect from "svelte-material-icons/BluetoothConnect.svelte";
  import Fullscreen from "svelte-material-icons/Fullscreen.svelte";
  import FullscreenExit from "svelte-material-icons/FullscreenExit.svelte";

  import { bluetoothAccessor, connectToDevice, disconnectFromDevice } from "./bluetooth/BLEConnection.svelte.js";
  import Controller from "./lib/controller/Controller.svelte";
  import Joystick from "./lib/joystick/Joystick.svelte";

  let isFullScreen = $state(false);
  function toggleFullscreen() {
    let elem = document.documentElement;

    if (!document.fullscreenElement) {
      elem.requestFullscreen()
        .then(() => { isFullScreen = true; })
        .catch((err) => {
      });
    } else {
      document.exitFullscreen();
      isFullScreen = false;
    }
  }
</script>

<main class="w-screen h-screen flex flex-col">
  <div class="flex items-center justify-between px-4 h-12">
    <div class="flex items-center justify-left gap-2">
      <div class="w-[16px] h-[16px] rounded-full"
        class:bg-green-600={bluetoothAccessor.bluetooth!==null}
        class:bg-red-600={bluetoothAccessor.bluetooth==null}
      >
      </div>
      <div class="font-bold">
        {bluetoothAccessor.bluetooth !== null 
        ? `Connected: ${bluetoothAccessor.bluetooth.device.name}`
        : 'Bluetooth Disconnected' }
      </div>
    </div>
    <!--- <img src="public/logo.png" /> --->
    <div class="flex gap-1">
    <button class="flex items-center gap-2 px-2 py-1 rounded-xl bg-neutral-700 " on:click={() => { bluetoothAccessor.bluetooth === null ? connectToDevice() : disconnectFromDevice() }} >
        {bluetoothAccessor.bluetooth === null 
        ? `Connect`
        : 'Disconnect' }
      <BluetoothConnect size={"2em"} />
    </button>
    <button class ="flex items-center rounded-xl p-1 bg-neutral-700" on:click={toggleFullscreen} >
      {#if !isFullScreen }
        <Fullscreen size={"2em"} />
      {:else}
        <FullscreenExit size={"2em"} />
      {/if}
    </button>
    </div>
  </div>

  <Controller >
    <div class="grow flex items-center justify-between px-8">
      <Joystick id={'a'} />
      <Joystick id={'b'} />
    </div>
  </Controller >

  <div class="w-full h-8 flex items-center justify-between px-2">
    <div class="font-semibold text-left">
      Microlab Stick, Developed by Microlab Robotics
    </div>
    <img src="logo-light.png" class="h-full" />
  </div>
</main>

<style>
</style>
