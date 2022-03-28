import Modal from "../profilePageComponents/Modal";
import ModalHeader from "../profilePageComponents/ModalHeader";

import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";

import React from 'react'
import { useState, useEffect } from 'react';

import { useSelector,useDispatch  } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletePost, reset } from '../../features/post/postSlice'

const DeletePostModal = ({currentPost,setCurrentPost, showDeleteModal, setShowDeleteModal}) => {

    const dispatch = useDispatch()

    const onDeleteClick = () =>{

        console.log(currentPost)

        setShowDeleteModal(false)

        // delete post 
            dispatch(deletePost(currentPost._id))
            window.location.reload();

            
    }

    const onDeleteCancel = () =>{
        setShowDeleteModal(false)

    }



  return (
    <>
    <Modal size="sm" aria-hidden="true" active={showDeleteModal} toggler={onDeleteCancel}>
                <ModalHeader toggler={onDeleteCancel}>
                    Delete post
                </ModalHeader>
                <ModalBody>
                    <p className="text-base leading-relaxed text-slate-100 font-normal">
                        Are you sure you want to delete this post?
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

export default DeletePostModal