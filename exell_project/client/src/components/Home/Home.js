import React from 'react'
import {AutoSizer, MultiGrid} from 'react-virtualized'

const Home = () => {

    const STYLE = {
        border: '1px solid #ddd',
    };
    const STYLE_BOTTOM_LEFT_GRID = {
        borderRight: '2px solid #aaa',
        backgroundColor: '#f7f7f7',
    };
    const STYLE_TOP_LEFT_GRID = {
        borderBottom: '2px solid #aaa',
        borderRight: '2px solid #aaa',
        fontWeight: 'bold',
    };
    const STYLE_TOP_RIGHT_GRID = {
        borderBottom: '2px solid #aaa',
        fontWeight: 'bold',
    };

    const cellRenderer = ({columnIndex, key, rowIndex, style}) => {
    return (
      <div key={key} style={style}>
        {columnIndex}, {rowIndex}
      </div>
    );
  }

    return (
        <>
            {/* <p style={{marginTop: "64px", fontSize: '32px'}}>Home</p> */}
            <AutoSizer disableHeight>
                {({width}) => (
                    <MultiGrid
                        fixedColumnCount ={1}
                        fixedRowCount= {1}
                        cellRenderer={cellRenderer}
                        columnWidth={75}
                        columnCount={100}
                        enableFixedColumnScroll
                        enableFixedRowScroll
                        height={window.outerHeight - 350}
                        rowHeight={40}
                        rowCount={100}
                        style={STYLE}
                        styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
                        styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
                        styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
                        width={width}
                        hideTopRightGridScrollbar
                        hideBottomLeftGridScrollbar
                    />
                )}
            </AutoSizer>
        </>
    );
};

export default Home;