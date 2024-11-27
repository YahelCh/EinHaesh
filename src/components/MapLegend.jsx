import React from 'react';


const MapLegend = ({ setActiveAction }) => {

    const signs = [
        { text: 'ארון כיבוי', color: 'white' },
        { text: 'ברז גז', color: 'red' },
        { text: 'שער', color: 'green' },
        { text: 'גנרטור', color: 'blue' },
        { text: 'הידרנט', color: '#36caca' },
        { text: 'דלת', color: '#c72830' },
        { text: 'לוח חשמל', color: '#eeba11' },
    ]


    return <div className='map-legend'>
        {signs.map(sign => <div style={{
            display: 'flex', gap: '7px',
            alignItems: 'center'
        }}>
            <div className='dot' style={{ backgroundColor: sign.color }}></div>
            <div>{sign.text}</div>
        </div>)}

    </div>
}

export default MapLegend;