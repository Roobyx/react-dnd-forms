import styled from "styled-components"
import { FiRefreshCw, FiMove, FiMinus, FiDownload, FiUpload, FiTrash2, FiEdit2, FiChevronLeft } from 'react-icons/fi'
import { IoDuplicateOutline } from 'react-icons/io5'
import { GoPlus } from 'react-icons/go'
import { CgArrowsH, CgArrowsV } from 'react-icons/cg'
import { FcDeleteDatabase, FcSearch } from 'react-icons/fc'

const IconContainer = styled.span`
`

const setIcon = icon => {
	switch (icon) {
		case 'add':
			return <GoPlus />

		case 'move':
			return <FiMove />

		case 'refresh':
			return <FiRefreshCw />

		case 'minus':
			return <FiMinus />
	
		case 'download':
			return <FiDownload />
	
		case 'upload':
			return <FiUpload />
		
		case 'trash':
			return <FiTrash2 />

		case 'edit':
			return <FiEdit2 />
		
		case 'duplicate':
			return <IoDuplicateOutline />

		case 'newRow':
			return <CgArrowsH />
		
		case 'newCell':
			return <CgArrowsV />

		case 'backArrow':
			return <FiChevronLeft />

		case 'noDb':
			return <FcDeleteDatabase />

		case 'search':
			return <FcSearch />
	
		default:
			return ''
	}
}

const Icon = ({icon}) => {

	return <IconContainer> {setIcon(icon)} </IconContainer> 
}

export default Icon