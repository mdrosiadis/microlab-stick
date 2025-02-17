<script>
  import { setContext } from 'svelte';
  import { bluetoothAccessor } from "../../bluetooth/BLEConnection.svelte.js";


  const period_ms = 50;
  const encoder = new TextEncoder();
  let knobs = $state({});

  function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  function subscribeKnob(id, knob) {
    knobs = {...knobs, [id]: knob}
  }

  function unsubscribeKnob(id) {
  }

  setContext('knobs', {subscribeKnob, unsubscribeKnob });

  setInterval(() => {
    if(bluetoothAccessor.bluetooth === null) return;
    if(Object.keys(knobs).length === 0) return;

    // const command = Math.round(knobs['a'].GetY() / 10) + "";
    const throttle = clamp(parseInt(knobs['a'].GetY()), -100, 100) + 128;
    const steer = clamp(parseInt(knobs['b'].GetX()), -100, 100) + 128;
    const command = new Uint8Array([throttle, steer]);

    bluetoothAccessor.bluetooth.writeCharacteristic.writeValueWithoutResponse(command)

  }, period_ms);
</script>

<slot />

