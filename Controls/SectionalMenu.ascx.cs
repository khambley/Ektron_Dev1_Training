using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using NewDevTraining;

public partial class Source_Controls_SectionalMenu : BaseUserControl
{
    /// <summary>
    /// The master menu control
    /// </summary>
    private Source_Controls_MainMenu _masterControl;

    /// <summary>
    /// Gets or sets the string Id of the slave's master control
    /// </summary>
    public string MasterControlId { get; set; }

    /// <summary>
    /// Gets or sets the unique Menu ID
    /// </summary>
    public long MenuId { get; set; }

    /// <summary>
    /// Handles the initialization event of the slave menu control.
    /// Searches for master control and sets the event handler, if found.
    /// </summary>
    /// <param name="sender">The parameter is not used.</param>
    /// <param name="e">The parameter is not used.</param>
    protected void Page_Init(object sender, EventArgs e)
    {
        //SetContentParameter();

        if (this.MasterControlId != null)
        {
            this._masterControl = this.FindControl<Source_Controls_MainMenu>(this.MasterControlId);

            // If the master control was found, set the event handler
            if (this._masterControl != null)
            {
                this._masterControl.MenuItemChanged += new Source_Controls_MainMenu.MenuItemChangedHandler(this.Source_Controls_MainMenu_MenuItemChanged);
            }
        }
    }

    /// <summary>
    /// Handles changing the slave menu based on the master menu selection
    /// </summary>
    /// <param name="sender">The parameter is not used.</param>
    /// <param name="menuEventArgs">A FlexMenuEventArgs object containing the title and ID of the selected master menu item</param>
    protected void Source_Controls_MainMenu_MenuItemChanged(object sender, Source_Controls_MainMenu.FlexMenuEventArgs menuEventArgs)
    {
        // When the menu id changes on the master control, it sets the id of the slave here
        UxSlaveMenuModelSource.TreeFilter.Id = menuEventArgs.CurrentMenuItemId;
        UxSlaveMenuModelSource.TreeFilter.Depth = 3;

        // Necessary workaround to access protected class
        UxSlaveMenuModelSource.GetType().GetMethod("LoadData", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.FlattenHierarchy).Invoke(this.UxSlaveMenuModelSource, new object[] { });
    }

    /// <summary>
    /// Method to find a control of a specified type elsewhere
    /// on the page or master page.
    /// </summary>
    /// <typeparam name="T">The type of the control</typeparam>
    /// <param name="controlId">The id string of the control</param>
    /// <returns>The control, if found - null otherwise.</returns>
    protected T FindControl<T>(string controlId) where T : System.Web.UI.Control
    {
        T control = null;

        if (controlId != null)
        {
            // Check the master page, if there is one, for the control
            if (Page.Master != null)
            {
                control = (T)Page.Master.FindControl(controlId);
            }

            // If control is still null, check the page for it
            if (control == null)
            {
                control = (T)Page.FindControl(controlId);
            }
        }

        return control;
    }
}