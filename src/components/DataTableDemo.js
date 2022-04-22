
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { UserService } from '../service/UserService';
import './DataTableDemo.scss';

const DataTableDemo = () => {
    const [users, setUsers] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'representative': { value: null, matchMode: FilterMatchMode.IN },
        'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'activity': { value: null, matchMode: FilterMatchMode.BETWEEN }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);



    const userService = new UserService();

    useEffect(() => {
        userService.getUsersLarge().then(data => { setUsers(getUsers(data)); setLoading(false) });
    }, []);

    const getUsers = (data) => {
        return [...data || []].map(d => {
            d.date = new Date(d.date);
            return d;
        });
    }



    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center" style={{ backgroundColor: "#433E5C"}} >
                <span className="p-input-icon-left" >
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="SEARCH(Client Name / Policy Number)" style={{ backgroundColor: "#433E5C"  ,color:"white",borderColor:"#433E5C",width:"150%"}} />
                </span>
            </div>
        )
    }

    const countryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div>
                    <h2>{rowData.user.name} </h2>
                </div>
                <span className="image-text">
                    <i className="pi pi-phone" />
                    {rowData.user.phone}</span>
                @ <span className="image-text" style={{ marginLeft: "5%" }}>{rowData.user.email}</span>
            </React.Fragment>
        );
    }

    const representativeBodyTemplate = (rowData) => {
        const policy = rowData.policy;
        return (
            <React.Fragment >
                <i className="pi pi-file" />
                <span >{policy}</span>
            </React.Fragment>
        );
    }


    const header = renderHeader();

    return (
        <div className="datatable-doc-demo">
            <div className="card">
                <DataTable value={users} className="p-datatable-customers" header={header}
                    dataKey="id" rowHover selection={selectedUsers} onSelectionChange={e => setSelectedUsers(e.value)}
                    filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                    globalFilterFields={['user.name', 'country.name', 'representative']} emptyMessage="No found."
                >
                    <Column field="user.email" body={countryBodyTemplate} />
                    <Column showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }} body={representativeBodyTemplate}
                    />
                </DataTable>
            </div>
        </div>
    );
}

export default DataTableDemo;
