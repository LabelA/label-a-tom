/** @babel */
/** @jsx etch.dom **/
import etch from 'etch';

export default class WelcomeView {
  /**
   * WelcomeView constructor
   * Initialises Etch, a component library using a simple and explicit API around virtual-dom
   * @param {Object} props
   * @return {Void}
   */
  constructor(props) {
    this.props = props;
    etch.initialize(this);
  }

  /**
   * When a window is refreshed or restored from a previous session, the view and its associated objects are deserialized from a JSON representation that was stored during the window's previous shutdown.
   * @see http://flight-manual.atom.io/behind-atom/sections/serialization-in-atom/
   * @return {Object} An object containing the name of a registered deserializer that can convert the rest of the data to an object
   */
  serialize () {
    return {
      deserializer: 'WelcomeView',
      uri: this.props.uri,
    }
  }

  /**
   * Required method from etch to make sure it is able to update the component with new properties and children
   * @return {Void}
   */
  update () {}

  /**
   * Changes the showOnStartup configuration to the current value of the checkbox
   * @return {Void}
   */
  toggleShowOnStartup () {
    atom.config.set('label-a-tom.showOnStartup', this.checked);
  }

  /**
   * Etch will call `render` to build and update the component's associated DOM element
   * @return {Object} A virtual DOM tree representing the current state of the component
   */
  render() {
    return (
      <div className='welcome'>
        <div className='welcome-container'>
          <header className='welcome-header'>
            <a href='https://labela.nl/'>
            <svg className='welcome-logo' xmlns="http://www.w3.org/2000/svg" width="186" height="169" viewBox="0 0 186 169">
              <g fill="none" fill-rule="evenodd" stroke="currentcolor" transform="translate(3 3)">
                <path stroke-width="3" d="M72,96.1492604 L82.559707,67 L100.964797,67 L111.296196,96.1492604 L98.3163331,96.1492604 L96.3277782,91.4434234 L86.7705385,91.4434234 L84.6085952,96.1492604 L72,96.1492604 Z M88.9345452,84.0957509 L94.0450671,84.0957509 L91.4756266,76.5190057 L88.9345452,84.0957509 Z"/>
                <g stroke-linecap="round">
                  <path stroke-width="5" d="M144.565307,37.7282742 C147.597124,22.3834664 145.901647,10.7378075 138.735388,6.10990605 C136.346633,4.56727217 133.482748,3.89222334 130.259581,4.01390702 C112.854482,4.67099883 84.7706781,28.5024164 61.825292,63.6383898 C34.6307604,105.281025 24.9665602,147.015197 40.2545888,156.888048 C47.5115955,161.574552 59.0755746,158.252378 72.1397655,148.994605"/>
                  <path stroke-width="5" d="M158.794886,106 C171.660732,101.058891 179.571987,94.2957534 179.983179,86.5283536 C180.934131,68.564675 141.445533,51.9339276 91.7433258,49.3552104 C87.0837452,49.1134561 82.5018857,48.9862489 78.0201065,49.0011804 C34.6962389,49.1455213 0.87859189,60.9112304 0.0167914545,77.190814 C-0.393588411,84.9429721 6.74051965,92.4599594 18.9700325,98.6981326"/>
                  <path stroke-width="5" d="M77.1679525,10.7449769 C68.3350593,3.45860467 60.0508988,-0.45421901 53.3951599,0.0420856228 C51.6230768,0.174226231 49.9841758,0.608424269 48.4611841,1.37994705 C32.2159464,9.60952382 37.4056794,52.1717638 60.0784545,96.4127034 C82.7512295,140.653647 114.299362,169.840732 130.5446,161.61115 C146.167397,153.69689 141.950746,114.036435 121.439172,71.662267"/>
                </g>
              </g>
            </svg>
            </a>
          </header>
          <section className='welcome-panel'>
            <p>Welcome to the Label A Front-end team! See the following URLs for resources that you should definitely check:</p>
            <ul>
              <li>The <a href='https://labela.atlassian.net/wiki/spaces/FD/overview'>Front-end WIKI</a> for all the details on our team</li>
              <li>The <a href='https://gitlab.labela.nl/'>GitLab</a> overview where you can see all our repositories</li>
            </ul>
          </section>
          <section className='welcome-panel'>
            <label>
              <input className='input-checkbox' type='checkbox' checked={atom.config.get('label-a-tom.showOnStartup')} onchange={this.toggleShowOnStartup} />
              Show the Label A-tom screen when opening Atom
            </label>
          </section>
        </div>
      </div>
    )
  }

  /**
   * Retrieves the URI of the current view
   * @return {String} The URI of the current view
   */
  getURI () {
    return this.props.uri;
  }

  /**
   * Method used by Atom to get the title for the current view
   * @return {String} The title that is displayed in the Atom tab
   */
  getTitle () {
    return 'label-a-tom';
  }

  /**
   * Method to check whether another instance matches the current view
   * @param {Object} other Another view instance to match against this view instance
   * @return {Boolean}
   */
  isEqual (other) {
    other instanceof WelcomeView;
  }
}
