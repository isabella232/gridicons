const toString = array => array.reduce( ( acc, item ) => ( acc = acc + "'" + item + "', " ), '' );

const prepareAllIcons = ( {
	components,
	iconsThatNeedOffset,
	iconsThatNeedOffsetX,
	iconsThatNeedOffsetY,
} ) => `
/**
 * External dependencies
 */
import React from 'react';

export default function( { icon: iconProp, className, onClick, size = 24, ...otherProps } ) {

	const iconsThatNeedOffset = [ ${ toString( iconsThatNeedOffset ) } ];

	const iconsThatNeedOffsetX = [ ${ toString( iconsThatNeedOffsetX ) } ];

	const iconsThatNeedOffsetY = [ ${ toString( iconsThatNeedOffsetY ) } ];

	const doesItNeedOffset = ( name, icons ) => icons.indexOf( name ) >= 0;
	const isModulo18 = size => size % 18 === 0;

	const icon = 'gridicons-' + iconProp;
	const needsOffset = doesItNeedOffset( icon, iconsThatNeedOffset ) && isModulo18( size );
	const needsOffsetX = doesItNeedOffset( icon, iconsThatNeedOffsetX ) && isModulo18( size );
	const needsOffsetY = doesItNeedOffset( icon, iconsThatNeedOffsetY ) && isModulo18( size );

	let svg;
	const iconClass = [
		'gridicon',
		icon,
		className,
		needsOffset ? 'needs-offset' : false,
		needsOffsetX ? 'needs-offset-x' : false,
		needsOffsetY ? 'needs-offset-y' : false,
	].filter( Boolean ).join( ' ' );

	switch ( icon ) {
		default:
			svg = <svg height={ size } width={ size } { ...otherProps } />;
			break;

		${ components }

	}

	return ( svg );
}
`;

module.exports = prepareAllIcons;
