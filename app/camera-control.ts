import * as THREE from "three";

export class CameraControl {

  public KEY_BINDING = {
    'ALT+RIGHT': 'moveLeft',
    'ALT+LEFT': 'moveRight',
    'ALT+UP': 'moveDown',
    'ALT+DOWN': 'moveUp'
  };

  public camera: THREE.Camera;

  private ctrlKeyPressed: boolean;
  private altKeyPressed: boolean;

  constructor(camera: THREE.Camera) {
    this.camera = camera;
    window.addEventListener('keydown', (event) => this.handleKeyDownEvent(event));
  }

  public handleKeyDownEvent(event:KeyboardEvent):any {
    if(event.target != document.querySelector('body')) {
      return;
    }

    this.altKeyPressed = event.altKey;
    this.ctrlKeyPressed = event.ctrlKey;

    switch(event.keyCode) {
      case 39: // arrow right
        this.evalKeyCombination('RIGHT');
        break;
      case 37: // arrow left
        this.evalKeyCombination('LEFT');
        break;
      case 38: // arrow up
        this.evalKeyCombination('UP');
        break;
      case 40: // arrow down
        this.evalKeyCombination('DOWN');
        break;
    }
  }

  private evalKeyCombination(key: string) {
    let keyCombinationString = '';
    keyCombinationString += this.ctrlKeyPressed ? 'CTRL+' : '';
    keyCombinationString += this.altKeyPressed ? 'ALT+' : '';
    keyCombinationString += key;

    let action = this.KEY_BINDING[keyCombinationString];

    switch(action) {
      case 'moveLeft':
        this.moveLeft();
        break;
      case 'moveRight':
        this.moveRight();
        break;
      case 'moveUp':
        this.moveUp();
        break;
      case 'moveDown':
        this.moveDown();
        break;
    }
  }

  private rotateLeft() {

  }

  private rotateRight() {

  }

  private orbitLeft() {

  }

  private orbitRight() {

  }

  private moveLeft() {
    this.camera.position.setX(this.camera.position.x - 1);
  }

  private moveRight() {
    this.camera.position.setX(this.camera.position.x + 1);
  }

  private moveUp() {
    this.camera.position.setY(this.camera.position.y + 1);
  }

  private moveDown() {
    this.camera.position.setY(this.camera.position.y - 1);
  }


}