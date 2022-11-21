const attrs = {
    circle: {
      r: 4,
      magnet: true,
      stroke: 'black',
      strokeWidth: 2,
      fill: '#fff'
    }
  };
  
  export const portsOne = {
    groups: {
      left: {
        position: 'left',
        attrs
      },
      right: {
        position: 'right',
        attrs
      }
    },
    items: [
      {
        id: 'port3',
        group: 'left'
      },
      {
        id: 'port4',
        group: 'right'
      }
    ]
  };

  export const getPortsByType = (type:number)=>{
    switch(type){
      case 1:
        return portsOne
      case 2:
        return portsOne
    }
  }