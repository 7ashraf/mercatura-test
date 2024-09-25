
import React from 'react'
import PlugConnect from '@psychedelic/plug-connect';


function plug() {
  return (
    <div>
        
        <PlugConnect
  whitelist={['canister-id']}
  onConnectCallback={
    () => console.log(window.ic.plug.agent.getPrincipal())
  }
/>
    </div>
  )
}

export default plug