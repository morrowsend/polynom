import React from "react"

import "./styles"

function Icon(props) {
  const { name } = props

  return (
    <svg
      className="ad-Icon"
      viewBox="0 0 1024 1024">
      <path d={ getIcon(name) } />
    </svg>
  )
}

function getIcon(name) {
  let icon

  switch (name) {
    case "right":
      icon = "M366 698l196-196-196-196 60-60 256 256-256 256z"
      break

    case "down":
      icon = "M316 334l196 196 196-196 60 60-256 256-256-256z"
      break

    case "add":
      icon = "M810 554h-256v256h-84v-256h-256v-84h256v-256h84v256h256v84z"
      break

    case "close":
      icon = "M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"
      break

    case "delete":
      icon = "M810 170v86h-596v-86h148l44-42h212l44 42h148zM256 810v-512h512v512q0 34-26 60t-60 26h-340q-34 0-60-26t-26-60z"
      break

    case "edit":
      icon = "M884 300l-78 78-160-160 78-78q12-12 30-12t30 12l100 100q12 12 12 30t-12 30zM128 736l472-472 160 160-472 472h-160v-160z"
      break

    case "settings":
      icon = "M512 662q62 0 106-44t44-106-44-106-106-44-106 44-44 106 44 106 106 44zM830 554l90 70q14 10 4 28l-86 148q-8 14-26 8l-106-42q-42 30-72 42l-16 112q-4 18-20 18h-172q-16 0-20-18l-16-112q-38-16-72-42l-106 42q-18 6-26-8l-86-148q-10-18 4-28l90-70q-2-14-2-42t2-42l-90-70q-14-10-4-28l86-148q8-14 26-8l106 42q42-30 72-42l16-112q4-18 20-18h172q16 0 20 18l16 112q38 16 72 42l106-42q18-6 26 8l86 148q10 18-4 28l-90 70q2 14 2 42t-2 42z"
      break

    case "paths":
      icon = "M592 792q28 0 56-37t36-113q-60 16-92 54t-32 64q0 14 10 23t22 9zM196 294l-74-72q20-24 36-40 54-54 116-54 38 0 73 30t35 92q0 60-56 140-56 78-78 150-12 34-7 58t21 24q18 0 48-36 44-44 98-116 96-120 210-120 84 0 125 55t47 123h106v106h-104q-12 138-74 200t-128 62q-56 0-96-39t-40-93q0-66 60-138t170-92q-2-16-3-22t-6-19-12-19-21-11-34-5q-56 0-174 146-34 42-47 57t-37 35-46 26q-70 22-120-26t-50-120q0-30 11-66t29-70 34-61 31-49 17-24q34-56 12-64-14-6-72 52z"
      break

    case "point":
      icon = "M640 512q0 52-38 90t-90 38-90-38-38-90 38-90 90-38 90 38 38 90zM512 854q140 0 241-101t101-241-101-241-241-101-241 101-101 241 101 241 241 101zM512 86q176 0 301 125t125 301-125 301-301 125-301-125-125-301 125-301 301-125z"
      break

    case "help":
      icon = "M642 480q40-40 40-96 0-70-50-120t-120-50-120 50-50 120h84q0-34 26-60t60-26 60 26 26 60-26 60l-52 54q-50 54-50 120v22h84q0-66 50-120zM554 810v-84h-84v84h84zM512 86q176 0 301 125t125 301-125 301-301 125-301-125-125-301 125-301 301-125z"
      break

    case "about":
      icon = "M470 384v-86h84v86h-84zM512 854q140 0 241-101t101-241-101-241-241-101-241 101-101 241 101 241 241 101zM512 86q176 0 301 125t125 301-125 301-301 125-301-125-125-301 125-301 301-125zM470 726v-256h84v256h-84z"
      break

    default:
      icon = ""
      break
  }

  return icon
}

export default Icon
