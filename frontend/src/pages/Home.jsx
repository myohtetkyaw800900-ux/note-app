import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import NodeModel from '../components/NodeModel.jsx'
import axios from 'axios'
import NoteCard from '../components/NoteCard.jsx'
import {toast} from 'react-toastify'

const Home = () => {

  const [isModelOpen , setIsModelOpen] = useState(false)
  const [filteredNotes, setFilteredNotes] = useState(false)
  const [notes ,setNotes]= useState([])
  const [currentNote , setCurrentNote] = useState(null)
  const [query , setQuery] = useState('')

  useEffect(()=>{
    fetchNotes()
  },[])

  useEffect(()=>{
    setFilteredNotes(
      notes.filter((note)=> note.title.toLowerCase().includes(query.toLowerCase()) || 
      note.description.toLowerCase().includes(query.toLowerCase())
      )
    )
  },[query , notes])
  const fetchNotes = async () =>{
    try {
      const {data} = await axios.get("http://localhost:5000/api/note",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setNotes(data.notes)
    } catch (error) {
      console.log(error)
    }
  }

  const closeModel = () => {
    setIsModelOpen(false)
  }

  const onEdit = (note) =>{
    setCurrentNote(note)
    setIsModelOpen(true)
  }

  const addNote = async (title , description) => {
      try {
        const response = await axios.post("http://localhost:5000/api/note/add",
        {title ,description}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if(response.data.success){
            fetchNotes()
            closeModel()
            toast.success("Note Add Success")
        }
    } catch (error) {
        console.log(error)
    }
  }

  const deleteNote = async (id) =>{
      try {
        const response = await axios.delete(`http://localhost:5000/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if(response.data.success){
            fetchNotes()
            toast.success("note deleted")
        }
    } catch (error) {
        console.log(error)
    }
  }

  const editNote = async (id,title , description)=>{
    try {
      const response = await axios.put(`http://localhost:5000/api/note/${id}`,
      {title ,description}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if(response.data.success){
          fetchNotes()
          closeModel()
          toast.success("Updated Scuuess")
      }
  } catch (error) {
      console.log(error)
  }
  }
  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar setQuery={setQuery}/>

      <div className='px-8 pt-5 grid grid-cols-1 md:grid-cols-3 gap-3'>
        {filteredNotes.length > 0 ? filteredNotes.map(note => (
          <NoteCard key={note._id} note={note} onEdit={onEdit} deleteNote={deleteNote}
        />
        )): <p>No Notes</p>}
      </div>

      <button onClick={()=>setIsModelOpen(true)} className='fixed right-4 bottom-4 bg-teal-500 text-white font-bold p-3 text-center rounded-2xl'>Add Note</button>
      {isModelOpen && <NodeModel closeModel={closeModel} addNote={addNote} currentNote={currentNote} editNote={editNote}/> }
    </div>
  )
}

export default Home