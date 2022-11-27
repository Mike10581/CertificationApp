import * as React from 'react'
import { useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Chip from '@mui/material/Chip'
import { Button } from '@mui/material'
import ModalWindow from '../../components/ModalWindow'
import { ITests } from '../../store/tests-store'

export default function DataTable(props: any) {
  const testsList = props.testsList
  const emptyTest = {
    id: '',
    title: '',
    difficulty: '',
    duration: 0,
    test: [],
  }
  const [selectedTest, setSelectedTest] = useState<ITests>(emptyTest)
  const [modalOpen, setModalOpen] = useState(false)

  console.log('Selected Test: ', selectedTest)
  const handleClick = (event: any, cellValues: any) => {
    setSelectedTest(testsList.filter((el: any) => el.id === cellValues.id)[0])
    setModalOpen(true)
  }

  const onClose = () => {
    setModalOpen(false)
    console.log('onClose')
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Test title', flex: 1 },
    {
      field: 'difficulty',
      headerName: 'Difficulty',
      flex: 0.2,
      renderCell: (params) => {
        return (
          <Chip
            size="small"
            variant="outlined"
            label={params.row.difficulty}
            color={
              params.row.difficulty === 'easy'
                ? 'success'
                : params.row.difficulty === 'medium'
                ? 'warning'
                : 'error'
            }
          />
        )
      },
    },
    { field: 'duration', headerName: 'Duration', width: 135 },
    { field: 'questions', headerName: 'Questions', width: 135 },

    {
      field: 'startTest',
      headerName: '',
      sortable: false,

      renderCell: (cellValues) => {
        return (
          <Button
            sx={{ color: 'testButton.main' }}
            // variant="outlined"
            onClick={(event) => handleClick(event, cellValues)}
          >
            Start
          </Button>
        )
      },
    },
  ]

  const rows = testsList.map((el: any) => ({
    id: el.id,
    title: el.title,
    difficulty: el.difficulty,
    duration: `${el.duration} minutes`,
    questions: el.test.length,
  }))

  return (
    <div style={{ height: '635px', width: '100%', marginTop: 20 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
      {
        <ModalWindow
          selectedTest={selectedTest}
          open={modalOpen}
          onClose={onClose}
        />
      }
    </div>
  )
}
