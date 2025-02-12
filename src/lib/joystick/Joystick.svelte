<script>
  import { onMount } from 'svelte';
  import JoyStick from "./joy.js";
  import { getContext } from 'svelte';

  const { subscribeKnob } = getContext('knobs');
  const {id} = $props();

  onMount(() => {
    const joystick = new JoyStick(id, {
      internalFillColor: "#ffa52f",
      internalStrokeColor: "#bd771c",
      externalStrokeColor: "#ffa52f",

    });

    subscribeKnob(id, joystick);
  });
</script>

<div id={id} style="width: 250px; height: 250px">
</div>

