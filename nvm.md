# Node Version Manager (nvm) Commands

This guide provides a comprehensive list of commands for **nvm**, a tool that simplifies managing multiple Node.js versions on a single machine.

---

### Basic Management

* **View Installed Versions**: To see all Node.js versions installed on your computer.
    ```bash
    nvm ls
    ```

* **View Available Versions**: To see all Node.js versions available for installation.
    ```bash
    nvm ls-remote
    ```

* **Install a Version**: To install a specific Node.js version. You can use a full version number or a major version to get the latest in that series.
    ```bash
    nvm install 22.18.0
    nvm install 22
    ```

* **Uninstall a Version**: To remove a specific Node.js version from your system.
    ```bash
    nvm uninstall 22.11.0
    ```

---

### Switching Node Versions

* **For the Current Session**: To temporarily switch to a different Node.js version.
    ```bash
    nvm use 22.19.0
    ```

* **Set as Default**: To permanently set a Node.js version as the default for all new terminal sessions.
    ```bash
    nvm alias default 22.19.0
    ```

---

### Automated Version Switching

Automate the process of switching Node.js versions for specific projects using an **`.nvmrc`** file.

* **Create `.nvmrc`**: In your project's root directory, create a file named `.nvmrc`. Inside this file, simply list the required Node.js version.

    You can also generate this file from your current Node.js version with this command:
    ```bash
    node -v > .nvmrc
    ```

* **Run `nvm use`**: Once the `.nvmrc` file is in place, navigate to the project directory and run `nvm use`. This command will read the file and automatically switch to the correct version.
    ```bash
    nvm use
    ```