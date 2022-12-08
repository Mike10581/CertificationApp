import {FC, ReactElement} from 'react'
import * as React from 'react'
import { useContext, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Chip from '@mui/material/Chip'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

const TestsList: FC<any> = (props: any): ReactElement => {
    const testsList = props.testsList
    console.log('TestList inside component: ', testsList)
    if (!testsList) return <></>;

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            hide: true,
        },
        {
            field: 'number',
            headerName: '№',
            width: 90,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'title',
            headerName: 'Test title',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'discipline',
            headerName: 'Discipline',
            flex: 0.4,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'level',
            headerName: 'Level',
            flex: 0.4,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'subject',
            headerName: 'Subject',
            flex: 0.4,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'difficulty',
            headerName: 'Difficulty',
            headerAlign: 'center',
            align: 'center',
            flex: 0.35,
            renderCell: (params) => {
                return (
                    <Chip
                        size="small"
                        variant="outlined"
                        label={params.row.difficulty}
                        color={
                            params.row.difficulty === 'easy'
                                ? 'success'
                                : params.row.difficulty === 'standard'
                                    ? 'warning'
                                    : 'error'
                        }
                    />
                )
            },
        },
        {
            field: 'duration',
            headerName: 'Duration',
            flex: 0.3,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'questions',
            headerName: 'Questions',
            flex: 0.3,
            headerAlign: 'center',
            align: 'center',
        },

        {
            field: 'startTest',
            headerName: '',
            sortable: false,
            headerAlign: 'center',
            align: 'center',

            renderCell: (cellValues) => {
                return (

                    <Button
                        sx={{ color: 'testButton.main' }}
                        // onClick={(event) => {
                        //     handleClick(event, cellValues)
                        // }}
                    >
                        <EditIcon onClick={()=>props.editTest(cellValues.id)}/>
                    </Button>
                )
            },
        },
    ]

    const rows = testsList.map((el: any, i: number) => ({
        id: el._id,
        discipline: el.discipline.name,
        level: el.level.name,
        subject: el.subject.name,
        number: i + 1,
        title: el.title,
        difficulty: el.difficulty,
        duration: `${el.duration} min.`,
        questions: el.questions.length,
    }))

    return (
        <div style={{ height: '635px', width: '100%', marginTop: 20 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </div>
    )
}

export default TestsList;
