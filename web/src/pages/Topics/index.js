import React, { useEffect, useState, useMemo } from 'react'
import { useSidebar } from '../../contexts/NavbarContext'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { GlobalFilter } from '../../components/TableFilter'
import api from '../../services/api'

import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

import './styles.css'

function Topics() {
  const [createModal, setCreateModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    const doFetch = async () => {
      const response = await api.get('/topics')
      console.log(response.data)
      setData(response.data)
    }
    doFetch()
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Nome",
        accessor: "nome",
      },
      {
        Header: "Cor",
        accessor: "cor",
      },
    ],
    []
  )

  const tableHooks = (hooks) => {

    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Actions',
        Header: 'Ações',
        Cell: (props) => (
          <div className="actions">
            <AiIcons.AiFillEdit
              className="actionButton"
              onClick={() => {
                setUpdateModal(true)
                console.log(props.row.original)
              }}
            />
            <AiIcons.AiFillDelete
              className="actionButton"
              onClick={() => {
                setDeleteModal(true)
              }}
            />
          </div>
        )
      }
    ])
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    nextPage,
    previousPage,
    setPageSize,
    pageOptions,
    setGlobalFilter,
    canNextPage,
    canPreviousPage,
  } = useTable({
    columns,
    data,
  }, tableHooks, useGlobalFilter, useSortBy, usePagination)

  const { globalFilter, pageIndex, pageSize } = state

  const { sidebar } = useSidebar(false)

  return (

    <>

      {createModal &&
        <div className="createModalBackground">
          <div className="modalContainer">
            <div className="modalHeader">
              <h1>Novo Assunto</h1>
              <AiIcons.AiOutlineClose
                onClick={() => { setCreateModal(false) }}
                style={{ color: '#909090', height: '18px', width: '18px', cursor: 'pointer' }}
              />
            </div>
            <div className="modalBody">
              <span>Nome</span>
              <input type="text" placeholder="Novo assunto" />
              <span>Cor</span>
              <input type="text" placeholder="" />
            </div>
            <div className="modalFooter">
              <button onClick={() => { setCreateModal(false) }}>Cancelar</button>
              <button>Criar</button>
            </div>
          </div>
        </div>
      }

      {updateModal &&
        <div className="createModalBackground">
          <div className="modalContainer">
            <div className="modalHeader">
              <h1># Assunto</h1>
              <AiIcons.AiOutlineClose
                onClick={() => { setUpdateModal(false) }}
                style={{ color: '#909090', height: '18px', width: '18px', cursor: 'pointer' }}
              />
            </div>
            <div className="modalBody">
              <span>Nome</span>
              <input type="text" placeholder="" />
              <span>Cor</span>
              <input type="text" placeholder="" />
            </div>
            <div className="modalFooter">
              <button onClick={() => { setUpdateModal(false) }}>Cancelar</button>
              <button>Salvar</button>
            </div>
          </div>
        </div>
      }

      {deleteModal &&
        <div className="createModalBackground">
          <div className="modalContainer">
            <div className="modalHeader">
              <h1># Assunto</h1>
              <AiIcons.AiOutlineClose
                onClick={() => { setDeleteModal(false) }}
                style={{ color: '#909090', height: '18px', width: '18px', cursor: 'pointer' }}
              />
            </div>
            <div className="modalBody">
              <span>Você irá deletar o assunto '#'</span>

            </div>
            <div className="modalFooter">
              <button onClick={() => { setDeleteModal(false) }}>Cancelar</button>
              <button>Deletar</button>
            </div>
          </div>
        </div>
      }

      <div className={sidebar ? 'pageContainer' : 'pageContainer expanded'}>
        <div className="pageContent">
          <div className="contentHeader">
            <div className="headerIcon">
              <BsIcons.BsFillBookmarksFill style={{ color: '#f4516c', height: '34px', width: '34px' }} />
              <h1>Assuntos</h1>
            </div>
            <div className="headerTools">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />


              <button
                className="openModalBtn"
                onClick={() => { setCreateModal(true) }}
              >
                Novo
              </button>

            </div>
          </div>

          <div className="contentBody">
            <table id="topicsTable" {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map(row => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="pagination">
              <button
                className='previous'
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Anterior
              </button>
              <span>
                Página <strong>{pageIndex + 1} de {pageOptions.length}</strong>
              </span>
              <select
                className="rowsSelection"
                value={pageSize}
                onChange={e => setPageSize(Number(e.target.value))}
              >
                {[5, 10, 25, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Mostrar {pageSize}
                  </option>
                ))}
              </select>
              <button
                className='next'
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topics;