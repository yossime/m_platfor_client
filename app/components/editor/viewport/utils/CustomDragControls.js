import {
	Controls,
	Matrix4,
	Plane,
	Raycaster,
	Vector2,
	Vector3,
	MOUSE,
	TOUCH
} from 'three';
import { EventDispatcher } from 'three';

const _plane = new Plane();

const _pointer = new Vector2();
const _offset = new Vector3();
const _diff = new Vector2();
const _previousPointer = new Vector2();
const _intersection = new Vector3();
const _worldPosition = new Vector3();
const _inverseMatrix = new Matrix4();

const _up = new Vector3();
const _right = new Vector3();

let _selected = null, _hovered = null;
const _intersections = [];

const STATE = {
	NONE: - 1,
	PAN: 0,
	ROTATE: 1
};

class DragControls extends EventDispatcher {

	constructor( objects, camera, domElement = null ) {

		super( camera, domElement );

		this.objects = objects;

		this.recursive = true;
		this.transformGroup = false;
		this.rotateSpeed = 1;

		this.raycaster = new Raycaster();

		// interaction

		this.mouseButtons = { LEFT: MOUSE.PAN, MIDDLE: MOUSE.PAN, RIGHT: MOUSE.ROTATE };
		this.touches = { ONE: TOUCH.PAN };

		// event listeners

		this._onPointerMove = onPointerMove.bind( this );
		this._onPointerDown = onPointerDown.bind( this );
		this._onPointerCancel = onPointerCancel.bind( this );
		this._onContextMenu = onContextMenu.bind( this );
		//

		if ( domElement !== null ) {

			this.connect();

		}

	}

	connect() {
		if (!this.domElement) {
			console.warn("CustomDragControls: domElement is not defined.");
			return;
		}
		console.log(objects, camera, domElement)

		this.domElement.addEventListener('pointermove', this._onPointerMove);
		this.domElement.addEventListener('pointerdown', this._onPointerDown);
		this.domElement.addEventListener('pointerup', this._onPointerCancel);
		this.domElement.addEventListener('pointerleave', this._onPointerCancel);

		this.domElement.style.touchAction = 'none';
	}

	disconnect() {
		if (!this.domElement) {
			console.warn("CustomDragControls: domElement is not defined in disconnect.");
			return;
		}

		this.domElement.removeEventListener('pointermove', this._onPointerMove);
		this.domElement.removeEventListener('pointerdown', this._onPointerDown);
		this.domElement.removeEventListener('pointerup', this._onPointerCancel);
		this.domElement.removeEventListener('pointerleave', this._onPointerCancel);

		this.domElement.style.touchAction = 'auto';
		this.domElement.style.cursor = '';
	}

	dispose() {

		this.disconnect();

	}

	_updatePointer( event ) {

		const rect = this.domElement.getBoundingClientRect();

		_pointer.x = ( event.clientX - rect.left ) / rect.width * 2 - 1;
		_pointer.y = - ( event.clientY - rect.top ) / rect.height * 2 + 1;

	}

	_updateState( event ) {

		// determine action

		let action;

		if ( event.pointerType === 'touch' ) {

			action = this.touches.ONE;

		} else {

			switch ( event.button ) {

				case 0:

					action = this.mouseButtons.LEFT;
					break;

				case 1:

					action = this.mouseButtons.MIDDLE;
					break;

				case 2:

					action = this.mouseButtons.RIGHT;
					break;

				default:

					action = null;

			}

		}

		// determine state

		switch ( action ) {

			case MOUSE.PAN:
			case TOUCH.PAN:

				this.state = STATE.PAN;

				break;

			case MOUSE.ROTATE:
			case TOUCH.ROTATE:

				this.state = STATE.ROTATE;

				break;

			default:

				this.state = STATE.NONE;

		}

	}

	getRaycaster() {

		console.warn( 'THREE.DragControls: getRaycaster() has been deprecated. Use controls.raycaster instead.' ); // @deprecated r169

		return this.raycaster;

	}

	setObjects( objects ) {

		console.warn( 'THREE.DragControls: setObjects() has been deprecated. Use controls.objects instead.' ); // @deprecated r169

		this.objects = objects;

	}

	getObjects() {

		console.warn( 'THREE.DragControls: getObjects() has been deprecated. Use controls.objects instead.' ); // @deprecated r169

		return this.objects;

	}

	activate() {

		console.warn( 'THREE.DragControls: activate() has been renamed to connect().' ); // @deprecated r169
		this.connect();

	}

	deactivate() {

		console.warn( 'THREE.DragControls: deactivate() has been renamed to disconnect().' ); // @deprecated r169
		this.disconnect();

	}

	set mode( value ) {

		console.warn( 'THREE.DragControls: The .mode property has been removed. Define the type of transformation via the .mouseButtons or .touches properties.' ); // @deprecated r169

	}

	get mode() {

		console.warn( 'THREE.DragControls: The .mode property has been removed. Define the type of transformation via the .mouseButtons or .touches properties.' ); // @deprecated r169

	}

}

function onPointerMove( event ) {

	const camera = this.object;
	const domElement = this.domElement;
	const raycaster = this.raycaster;

	if ( this.enabled === false ) return;

	this._updatePointer( event );

	raycaster.setFromCamera( _pointer, camera );

	if ( _selected ) {

		if ( this.state === STATE.PAN ) {

			if ( raycaster.ray.intersectPlane( _plane, _intersection ) ) {

				_selected.position.copy( _intersection.sub( _offset ).applyMatrix4( _inverseMatrix ) );

			}

		} else if ( this.state === STATE.ROTATE ) {

			_diff.subVectors( _pointer, _previousPointer ).multiplyScalar( this.rotateSpeed );
			_selected.rotateOnWorldAxis( _up, _diff.x );
			_selected.rotateOnWorldAxis( _right.normalize(), - _diff.y );

		}

		this.dispatchEvent( { type: 'drag', object: _selected } );

		_previousPointer.copy( _pointer );

	} else {

		// hover support

		if ( event.pointerType === 'mouse' || event.pointerType === 'pen' ) {

			_intersections.length = 0;

			raycaster.setFromCamera( _pointer, camera );
			raycaster.intersectObjects( this.objects, this.recursive, _intersections );

			if ( _intersections.length > 0 ) {

				const object = _intersections[ 0 ].object;

				_plane.setFromNormalAndCoplanarPoint( camera.getWorldDirection( _plane.normal ), _worldPosition.setFromMatrixPosition( object.matrixWorld ) );

				if ( _hovered !== object && _hovered !== null ) {

					this.dispatchEvent( { type: 'hoveroff', object: _hovered } );

					domElement.style.cursor = 'auto';
					_hovered = null;

				}

				if ( _hovered !== object ) {

					this.dispatchEvent( { type: 'hoveron', object: object } );

					domElement.style.cursor = 'pointer';
					_hovered = object;

				}

			} else {

				if ( _hovered !== null ) {

					this.dispatchEvent( { type: 'hoveroff', object: _hovered } );

					domElement.style.cursor = 'auto';
					_hovered = null;

				}

			}

		}

	}

	_previousPointer.copy( _pointer );

}


function onPointerDown(event) {
    const camera = this.object;
    const domElement = this.domElement;
    const raycaster = this.raycaster;

    if (this.enabled === false) return;

    this._updatePointer(event);
    this._updateState(event);

    _intersections.length = 0;

    raycaster.setFromCamera(_pointer, camera);
    raycaster.intersectObjects(this.objects, this.recursive, _intersections);

    if (_intersections.length > 0) {
        const intersectedObject = this.transformGroup ? findGroup(_intersections[0].object) : _intersections[0].object;

        if (isMeshMovable(intersectedObject)) {
            _selected = intersectedObject;

            _plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(_plane.normal), _worldPosition.setFromMatrixPosition(_selected.matrixWorld));

            if (raycaster.ray.intersectPlane(_plane, _intersection)) {
                if (this.state === STATE.PAN) {
                    _inverseMatrix.copy(_selected.parent.matrixWorld).invert();
                    _offset.copy(_intersection).sub(_worldPosition.setFromMatrixPosition(_selected.matrixWorld));
                } else if (this.state === STATE.ROTATE) {
                    _up.set(0, 1, 0).applyQuaternion(camera.quaternion).normalize();
                    _right.set(1, 0, 0).applyQuaternion(camera.quaternion).normalize();
                }
            }

            domElement.style.cursor = 'move';
            this.dispatchEvent({ type: 'dragstart', object: _selected });
        }
    }

    _previousPointer.copy(_pointer);
}

function onPointerCancel() {

	if ( this.enabled === false ) return;

	if ( _selected ) {

		this.dispatchEvent( { type: 'dragend', object: _selected } );

		_selected = null;

	}

	this.domElement.style.cursor = _hovered ? 'pointer' : 'auto';

	this.state = STATE.NONE;

}

function onContextMenu( event ) {

	if ( this.enabled === false ) return;

	event.preventDefault();

}

function findGroup( obj, group = null ) {

	if ( obj.isGroup ) group = obj;

	if ( obj.parent === null ) return group;

	return findGroup( obj.parent, group );

}

function isMeshMovable(mesh) {
	console.log("mesh",mesh)

    return mesh.userData.draggable === true;
}

export default DragControls ;


























// export default class CustomDragControls extends DragControls {
//     constructor(objects, camera, domElement) {
//         super(objects, camera, domElement);

//         this.domElement = domElement;

//         // אם domElement קיים, חיבור האירועים דרך connect
//         if (this.domElement) {
//             this.connect();
//         }
//     }

//     connect() {
//         console.log("connect");

//         // קישור אירועים ל- domElement, כולל קריאה לפונקציות ישירות מהמחלקה
//         this.domElement.addEventListener("pointermove", this.onPointerMove.bind(this));
//         this.domElement.addEventListener("pointerdown", this.onPointerDown.bind(this)); // מימוש מותאם
//         this.domElement.addEventListener("pointerup", this.onPointerCancel.bind(this));
//         this.domElement.addEventListener("pointerleave", this.onPointerCancel.bind(this));
//         this.domElement.addEventListener("contextmenu", this.onContextMenu.bind(this));

//         this.domElement.style.touchAction = "none";
//     }

//     // מימוש מותאם ל-onPointerDown
//     onPointerDown(event) {
//         console.log("Custom onPointerDown");

//         const camera = this.object;
//         const domElement = this.domElement;
//         const raycaster = this.raycaster;

//         if (!this.enabled) return;

//         this._updatePointer(event);
//         this._updateState(event);

//         _intersections.length = 0;

//         raycaster.setFromCamera(_pointer, camera);
//         raycaster.intersectObjects(this.objects, this.recursive, _intersections);

//         if (_intersections.length > 0) {
//             const intersectedObject = this.transformGroup
//                 ? findGroup(_intersections[0].object)
//                 : _intersections[0].object;

//             if (this.isMeshMovable(intersectedObject)) {
//                 _selected = intersectedObject;

//                 _plane.setFromNormalAndCoplanarPoint(
//                     camera.getWorldDirection(_plane.normal),
//                     _worldPosition.setFromMatrixPosition(_selected.matrixWorld)
//                 );

//                 if (raycaster.ray.intersectPlane(_plane, _intersection)) {
//                     if (this.state === STATE.PAN) {
//                         _inverseMatrix.copy(_selected.parent.matrixWorld).invert();
//                         _offset.copy(_intersection).sub(_worldPosition.setFromMatrixPosition(_selected.matrixWorld));
//                     } else if (this.state === STATE.ROTATE) {
//                         _up.set(0, 1, 0).applyQuaternion(camera.quaternion).normalize();
//                         _right.set(1, 0, 0).applyQuaternion(camera.quaternion).normalize();
//                     }
//                 }

//                 domElement.style.cursor = "move";
//                 this.dispatchEvent({ type: "dragstart", object: _selected });
//             }
//         }

//         _previousPointer.copy(_pointer);
//     }

//     isMeshMovable(mesh) {
//         console.log("mesh", mesh);
//         return mesh.userData.draggable === true;
//     }
// }



// import { DragControls } from "three/addons/controls/DragControls.js";

// export default class CustomDragControls extends DragControls {
//   constructor(objects, camera, domElement = null) {
//     super(objects, camera, domElement);

// 	  this._onPointerDown = this.onPointerDown.bind(this); 
	
// }
// onPointerDown(event) {
//   console.log("Custom pointer down behavior");
// }


// }


