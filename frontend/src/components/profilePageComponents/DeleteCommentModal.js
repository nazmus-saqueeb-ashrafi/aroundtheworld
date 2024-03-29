import Modal from "../profilePageComponents/Modal";
import ModalHeader from "../profilePageComponents/ModalHeader";

import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";

import React from 'react'
import { useState, useEffect } from 'react';

import { useSelector,useDispatch  } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteComment, reset } from '../../features/post/postSlice'

const DeleteCommentModal = ({currentComment,setCurrentComment,showCommentDeleteModal, setShowCommentDeleteModal}) => {

    const dispatch = useDispatch()

    const onDeleteClick = () =>{

        console.log(currentComment)

        setShowCommentDeleteModal(false)

        // delete comment
            dispatch(deleteComment(currentComment))
            window.location.reload();

            
    }

    const onDeleteCancel = () =>{
        setShowCommentDeleteModal(false)
        setCurrentComment(null)

    }

//     useEffect(()=>{

//         setDescription('')
    
//   },[showDeleteModal])



  return (
    <>
    <Modal size="sm" aria-hidden="true" active={showCommentDeleteModal} toggler={onDeleteCancel}>
                <ModalHeader toggler={onDeleteCancel}>
                    Delete comment
                </ModalHeader>
                <ModalBody>
                    <p className="text-base leading-relaxed text-slate-100 font-normal">
                        Are you sure you want to delete this comment?
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={onDeleteCancel}
                        ripple="dark"
                    >
                        Cancel
                    </Button>

                    <Button
                        className="btn btn-secondary"
                        onClick={onDeleteClick}
                        
                    >
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>
    </>
  )
}

export default DeleteCommentModal