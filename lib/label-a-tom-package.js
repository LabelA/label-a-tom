/** @babel */
import { CompositeDisposable } from 'atom';

let WelcomeView;
const WELCOME_URI = 'atom://label-a-tom/welcome';

export default class LabelATomPackage {
  /**
   * Called when the package is activated
   * @param {Object} state State data from the last time the window was serialized
   * @return {Void}
   */
  async activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register the opener that will return a new instance of the WelcomeView
    this.subscriptions.add(atom.workspace.addOpener((filePath) => {
      if (filePath === WELCOME_URI) {
        return this.createWelcomeView({uri: WELCOME_URI});
      }
    }));

    // Register the command that will show the welcome view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'label-a-tom:show': () => this.show(),
    }));

    // Check whether we should open the WelcomeView when starting up Atom
    if (atom.config.get('label-a-tom.showOnStartup')) {
      await this.show();
    }

    // Install the dependencies that we want every front-end developer to have
    require('atom-package-deps').install('label-a-tom')
      .then(function() {
        console.log('All dependencies are installed!')
      })
  }

  /**
   * Method that makes Atom open the WelcomeView
   * @return {Promise} A single Promise that resolves when all of the promises in the iterable argument have resolved
   */
  show () {
    return Promise.all([
      atom.workspace.open(WELCOME_URI),
    ]);
  }

  /**
   * Invoked when the package is deactivated, makes sure we don't listen to openers and commands anymore
   * @return {Void}
   */
  deactivate() {
    this.subscriptions.dispose();
  }

  /**
   * Checks whether WelcomeView is already required and returns a new instance of the WelcomeView class
   * @param  {Object} state State data from the last time the window was serialized
   * @return {WelcomeView} Instance of the WelcomeView class
   */
  createWelcomeView (state) {
    if (WelcomeView == null) {
      WelcomeView = require('./welcome-view');
    }

    return new WelcomeView({...state});
  }
};
