import {Image} from '../types'
export const getImageData = (img: any): Image => {
	return {
		id: img.id,
		width: img.width,
		height: img.height,
		description: img.alt_description,
		url: img.urls.regular,
	}
}
