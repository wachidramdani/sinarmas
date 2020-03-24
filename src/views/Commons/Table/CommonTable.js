import React from 'react';
import { Button } from 'reactstrap';
//------react-bootstrap-table---------------
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { tableOptions } from './TableOptions';

const CommonTable = (props) => {

    const handleClick = (e, tipe, val) => {
        e.preventDefault();
        props.action(tipe, val);
    }

    const qualityType = {
        0: 'Sold',
        1: 'Booked',
        2: 'Available'
    };
      
    function enumFormatter(cell, row, enumObject) {
        return enumObject[cell];
    }

    function actionTable (cell, row) {
        return  <div>
                    <Button className="btn-css3 btn-brand icon mr5px btn-sm" onClick={() => { props.action(row.id) } }>
                        <i className="icon-price-tag3"></i>
                    </Button>
                </div>;
    }

    function icon (cell, row) {
        return  <span><i className={ row.icon }></i> <b>{row.address}</b></span>;
    }

    function status (cell, row) {
        if(row.status_unit === 'Sold') {
          return  <div style={{width: '60px', backgroundColor: 'rgb(255,72,72,.5)', padding: '2px 0px'}}>{ row.status_unit }</div>;
        }else if(row.status_unit === 'Booked') {
          return  <div style={{width: '60px', backgroundColor: 'rgba(255,250,72,.5)', padding: '2px 0px'}}>{ row.status_unit }</div>;
        }else{
          return  <div style={{width: '60px', backgroundColor: 'rgba(74,255,160,.5)', padding: '2px 0px'}}>{ row.status_unit }</div>;
        }
        
    }

    return(
        <div>
            <div className="buttonTable">
                {/* <Button className="btn-vine btn-brand btn-sm" onClick={ e => handleClick(e, 'download', '') }>
                    <i className="icon-file-excel"></i>
                    <span>Download</span>
                </Button>
                <Button className="btn-twitter btn-brand btn-sm"  onClick={ e => handleClick(e, 'add', '') }>
                    <i className="icon-plus-circle2"></i>
                    <span>Add Data</span>
                </Button> */}
            </div>
            <BootstrapTable data={ props.datas } striped hover version='4' 
                search={ false }
                height={360}
                options={ tableOptions }
                >
                    {/* {
                        props.tableHead.map((column, index) => {
                            return <TableHeaderColumn 
                                        width={ column.width }
                                        key={ column.dataField } 
                                        dataField={ column.dataField } 
                                        headerAlign={ column.headerAlign } 
                                        dataAlign={ column.dataAlign }
                                        dataSort={ column.dataSort }
                                        tdStyle={ column.tdStyle }
                                        dataFormat={ column.dataFormat } 
                                    >
                                            { column.title }
                                    </TableHeaderColumn>
                        })
                    } */}
                    <TableHeaderColumn dataField='address' filter={ { type: 'TextFilter', delay: 1000 } } headerAlign='center' width='' dataAlign='center' dataFormat={icon} isKey>Address</TableHeaderColumn>
                    <TableHeaderColumn dataField='status_unit' filter={ { type: 'TextFilter', delay: 1000 } }  headerAlign='center' width='80' dataAlign='center' dataFormat={ status }>Status</TableHeaderColumn>
                    <TableHeaderColumn dataField='action'  headerAlign='center' width='60' dataAlign='center' dataFormat={actionTable}>Action</TableHeaderColumn>
            </BootstrapTable>
        </div>
    )
}

export default CommonTable