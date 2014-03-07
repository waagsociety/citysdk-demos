/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var Detector = {

	canvas: !! window.CanvasRenderingContext2D,
	webgl: ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )(),
	workers: !! window.Worker,
	fileapi: window.File && window.FileReader && window.FileList && window.Blob,

	getWebGLErrorMessage: function () {

		var element = document.createElement( 'div' );
		element.id = 'webgl-error-message';
		element.style.fontFamily = 'monospace';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'left';
		element.style.background = '#fff';
		element.style.color = '#000';
		element.style.padding = '1.5em';
		element.style.width = '400px';
		element.style.margin = '5em auto 0';

		if ( ! this.webgl ) {

			element.innerHTML = window.WebGLRenderingContext ? [
				'Your graphics card or browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.<br><br>',
				'Chrome or Firefox will run webGL out of the box. For Safari you have to enable webGL, by enabling the developer menu and check the “Enable WebGL” option.<br><br>',
				'At this moment, this 3D visualisation can not run on a mobile device. A (mobile) canvas edition will come soon.<br>',
				'Look at <a href="http://dev.citysdk.waag.org" style="color:#000">dev.citysdk.waag.org</a> for more information.<br><br>'
			].join( '\n' ) : [
				'Your graphics card or browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.<br><br>',
				'Chrome or Firefox will run webGL out of the box. For Safari you have to enable webGL, by enabling the developer menu and check the “Enable WebGL” option.<br><br>',
				'At this moment, this 3D visualisation can not run on a mobile device. A (mobile) canvas edition will come soon.<br>',
				'Look at <a href="http://dev.citysdk.waag.org" style="color:#000">dev.citysdk.waag.org</a> for more information.<br><br>'
			].join( '\n' );

		}
		
		var img = document.createElement("IMG");
		img.src = "images/noWebGl_400.jpg";
		//img.style.position='absolute';
		//img.style.left='0px';
		element.appendChild(img);

		return element;

	},

	addGetWebGLMessage: function ( parameters ) {

		var parent, id, element;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		element = Detector.getWebGLErrorMessage();
		element.id = id;

		parent.appendChild( element );

	}

};
