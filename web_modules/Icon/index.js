import "./styles"

import React, { PropTypes } from "react"

function getIcon(name) {
  switch (name) {
  case "polynom":
    return `M983.04,1024H40.96A40.96,40.96,0,0,1,0,983.04V40.96A40.96,40.96,0,0,
      1,40.96,0H983.04A40.96,40.96,0,0,1,1024,40.96V983.04A40.96,40.96,0,0,1,
      983.04,1024ZM300.165,266.24h0a8.765,8.765,0,0,0-8.765,8.765h0V743.936a
      8.765,8.765,0,0,0,8.765,8.765h96.256a8.765,8.765,0,0,0,8.765-8.765h0V
      589.527H457.1c114.289,0,179.948-60.611,179.948-166.062,0.01-100.393
      -65.659-157.225-179.937-157.225H300.165ZM405.2,367.288h45.609c39.148,0,
      61.87,21.443,61.87,59.965,0,39.772-22.733,61.245-61.87,61.245H405.2V
      367.288Zm266.24,271.8a58.368,58.368,0,0,0-58.195,58.541v0.186A57.221,
      57.221,0,0,0,667.6,757.762q2.817,0.138,5.638,0a59.607,59.607,0,0,0,59.393
      -59.82v-0.165a56.77,56.77,0,0,0-61.143-58.685h-0.051Z`

  case "right":
    return `M366 698l196-196-196-196 60-60 256 256-256 256z`

  case "down":
    return `M316 334l196 196 196-196 60 60-256 256-256-256z`

  case "add":
    return `M810 554h-256v256h-84v-256h-256v-84h256v-256h84v256h256v84z`

  case "close":
    return `M810 274l-238 238 238 238-60 60-238-238-238 238-60-60
      238-238-238-238 60-60 238 238 238-238z`

  case "delete":
    return `M810 170v86h-596v-86h148l44-42h212l44 42h148zM256
      810v-512h512v512q0 34-26 60t-60 26h-340q-34 0-60-26t-26-60z`

  case "edit":
    return `M884 300l-78 78-160-160 78-78q12-12 30-12t30 12l100 100q12
      12 12 30t-12 30zM128 736l472-472 160 160-472 472h-160v-160z`

  case "paths":
    return `M592 792q28 0 56-37t36-113q-60 16-92 54t-32 64q0 14 10 23t22 9zM196
      294l-74-72q20-24 36-40 54-54 116-54 38 0 73 30t35 92q0 60-56 140-56 78-78
      150-12 34-7 58t21 24q18 0 48-36 44-44 98-116 96-120 210-120 84 0 125 55t47
      123h106v106h-104q-12 138-74 200t-128 62q-56 0-96-39t-40-93q0-66
      60-138t170-92q-2-16-3-22t-6-19-12-19-21-11-34-5q-56 0-174 146-34 42-47
      57t-37 35-46 26q-70 22-120-26t-50-120q0-30 11-66t29-70 34-61 31-49
      17-24q34-56 12-64-14-6-72 52z`

  case "point":
    return `M640 384v-256h86v86h170v84h-170v86h-86zM896 554h-426v-84h426v84z
      M298 384h86v256h-86v-86h-170v-84h170v-86zM554 896h-84v-256h84v86h342v84
      h-342v86zM128 214h426v84h-426v-84zM128 726h256v84h-256v-84z`

  case "settings":
    return `M12 15.516c1.922 0 3.516-1.594 3.516-3.516s-1.594-3.516-3.516-3.516
      -3.516 1.594-3.516 3.516 1.594 3.516 3.516 3.516zM19.453 12.984l2.109
      1.641c0.188 0.141 0.234 0.422 0.094 0.656l-2.016 3.469c-0.141 0.234-0.375
      0.281-0.609 0.188l-2.484-0.984c-0.516 0.375-1.078 0.75-1.688 0.984l-0.375
      2.625c-0.047 0.234-0.234 0.422-0.469 0.422h-4.031c-0.234 0-0.422-0.188
      -0.469-0.422l-0.375-2.625c-0.609-0.234-1.172-0.563-1.688-0.984l-2.484
      0.984c-0.234 0.094-0.469 0.047-0.609-0.188l-2.016-3.469c-0.141-0.234-0.094
      -0.516 0.094-0.656l2.109-1.641c-0.047-0.328-0.047-0.656-0.047-0.984s0
      -0.656 0.047-0.984l-2.109-1.641c-0.188-0.141-0.234-0.422-0.094-0.656l2.016
      -3.469c0.141-0.234 0.375-0.281 0.609-0.188l2.484 0.984c0.516-0.375 1.078
      -0.75 1.688-0.984l0.375-2.625c0.047-0.234 0.234-0.422 0.469-0.422h4.031
      c0.234 0 0.422 0.188 0.469 0.422l0.375 2.625c0.609 0.234 1.172 0.563 1.688
      0.984l2.484-0.984c0.234-0.094 0.469-0.047 0.609 0.188l2.016 3.469c0.141
      0.234 0.094 0.516-0.094 0.656l-2.109 1.641c0.047 0.328 0.047 0.656 0.047
      0.984s0 0.656-0.047 0.984z`

  case "reorder":
    return `M170 640v-86h684v86h-684zM854 384v86h-684v-86h684z`

  case "check":
    return `M384 690l452-452 60 60-512 512-238-238 60-60z`

  default:
    return ""
  }
}

const Icon = ({ name }) => (
  <svg
    className="ad-Icon"
    viewBox="0 0 1024 1024">
    <path d={ getIcon(name) } />
  </svg>
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Icon
