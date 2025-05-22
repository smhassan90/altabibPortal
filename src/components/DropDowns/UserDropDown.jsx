"use client"
import React, { useRef, useState, useEffect, useContext } from "react"
import { createPopper } from "@popperjs/core"
import Image from "next/image"
import profileImage from "@/assets/img/avatar9.png"
import { ChevronDown } from 'lucide-react';
import { useRouter } from "next/navigation"
export default function UserDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const triggerRef = useRef(null)
  const dropdownRef = useRef(null)
  const popperInstance = useRef(null)
  const router = useRouter()
  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Setup popper when dropdown opens
  useEffect(() => {
    if (dropdownOpen && triggerRef.current && dropdownRef.current) {
      popperInstance.current = createPopper(triggerRef.current, dropdownRef.current, {
        placement: "bottom-end",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      })
    }

    return () => {
      if (popperInstance.current) {
        popperInstance.current.destroy()
        popperInstance.current = null
      }
    }
  }, [dropdownOpen])

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  // Menu items
  const menuItems = [
    { label: "Log out", onClick: () => {
      dispatch(logout())
      resetContext();
      router.push('/auth/login')
    }, isDanger: true },
  ]

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        className="flex items-center gap-2 rounded-full focus:outline-none"
        onClick={toggleDropdown}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-black bg-gray-200">
          <Image
            alt={`Admin12's profile picture`}
            className="object-cover"
            src={profileImage}
            fill
            sizes="40px"
          />
        </div>
        <ChevronDown color="black"/>
      </button>
      <div
        ref={dropdownRef}
        className={`${
          dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } absolute right-0 z-50 mt-2 w-32 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-150`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
      >
        {/* User name */}
        <div className="px-4 py-1 text-[16px] font-medium text-gray-700 capitalize border-b">Osama</div>
        {/* <div className="my-1 h-px bg-gray-200"></div> */}
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <button
              className={`block w-full px-4 py-1 text-left text-sm ${
                item.isDanger ? "!text-red-500 hover:bg-red-50" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                item.onClick()
                setDropdownOpen(false)
              }}
              role="menuitem"
            >
              {item.label}
            </button>
            {index === menuItems.length - 2 && <div className="my-1 h-px bg-gray-200"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
