using System;
using System.Web.UI;
using Ektron.Cms;
using Ektron.Cms.Framework.Content;
using Ektron.Cms.Framework.UI.Controls.EktronUI;
using Ektron.Cms.Framework.UI.Controls.Views;
using NewDevTraining;

public partial class Source_Controls_MainMenu : BaseUserControl
{
    /// <summary>
    /// Flag indicating whether or not a menu is selected. Used so that
    /// no further checks are made after a match has been found.
    /// </summary>
    private bool _isMenuSelected;

    /// <summary>
    /// Handler for the MenuItemChanged event
    /// </summary>
    /// <param name="sender">The parameter is not used.</param>
    /// <param name="menuEventArgs">The event arguments about the selected item (name and id).</param>
    public delegate void MenuItemChangedHandler(object sender, FlexMenuEventArgs menuEventArgs);

    /// <summary>
    /// An event that is fired when it is detected that a particular
    /// item on the main navigation has been selected.
    /// </summary>
    public event MenuItemChangedHandler MenuItemChanged;

    /// <summary>
    /// Gets or sets the menu Id to display
    /// </summary>
    public long MenuId { get; set; }

    /// <summary>
    /// Gets or sets the menu depth to display
    /// </summary>
    public int Depth { get; set; }

    /// <summary>
    /// Gets or sets the ID of the currently relevant content item (if any)
    /// </summary>
    private long ContentId { get; set; }

    /// <summary>
    /// Gets or sets the ContentData of the currently relevant content item (if any)
    /// </summary>
    private ContentData Content { get; set; }

    /// <summary>
    /// Handles the initialization event of the master menu control.
    /// </summary>
    /// <param name="sender">The parameter is not used.</param>
    /// <param name="e">The parameter is not used.</param>
    protected void Page_Load(object sender, EventArgs e)
    {
        this._isMenuSelected = false;

        this.SetContentParameters();

        UxMasterMenuView.NodeBound += new TreeViewEventHandler(this.UxMasterMenu_NodeBound);

        UxMasterMenuModelSource.TreeFilter.Id = this.MenuId;
        UxMasterMenuModelSource.TreeFilter.Depth = this.Depth;

        // Necessary workaround to access protected class

        UxMasterMenuModelSource.GetType().GetMethod("LoadData", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.FlattenHierarchy).Invoke(this.UxMasterMenuModelSource, new object[] { });
    }

    /// <summary>
    /// Handles the NodeBound event. Will check which item is
    /// selected in the main navigation and fire MenuItemChanged,
    /// passing it the info about that item.
    /// </summary>
    /// <param name="sender">The parameter is not used.</param>
    /// <param name="e">Menu event arguments used to determine which item is selected.</param>
    protected void UxMasterMenu_NodeBound(object sender, TreeViewEventArgs e)
    {
        if (!this._isMenuSelected)
        {
            // Check recursively for URL or content ID matches
            if (this.DoesMenuHaveMatch(e.Item as MenuTreeNode))
            {
                e.Item.Selected = true;
                this._isMenuSelected = true;
            }
            else if (e.Item.Type != null && e.Item.Type.ToLower() == "submenu")
            {
                // Check for folder association
                MenuTreeNode submenudata = (MenuTreeNode)e.Item;

                if (this.Content != null && submenudata.AssociatedFolders.Contains(this.Content.FolderId))
                {
                    e.Item.Selected = true;
                    this._isMenuSelected = true;
                }
            }
            else
            {
                e.Item.Selected = false; // We want to ensure that only one item is marked as selected for styling purposes
            }

            // Fire the MenuItemChangedHandler Event
            if (this._isMenuSelected && this.MenuItemChanged != null && ((MenuView)sender).ID == "UxMasterMenuView")
            {
                this.MenuItemChanged(this, new FlexMenuEventArgs { CurrentMenuItemId = Convert.ToInt64(e.Item.Id), CurrentMenuName = e.Item.Text });
            }
            else if (this._isMenuSelected && this.MenuItemChanged != null)
            {
                // This is required for News items.
                // News items are not assigned to a menu directly, instead the menu is associated with a folder.
                // This makes sure that a menu item is still displayed on the page.
                this.MenuItemChanged(this, new FlexMenuEventArgs { CurrentMenuItemId = Convert.ToInt64(e.Item.ParentId), CurrentMenuName = e.Item.Text });
            }
        }
        else
        {
            e.Item.Selected = false; // We want to ensure that only one item is marked as selected for styling purposes
        }
    }

    /// <summary>
    /// Checks recursively for URL or content ID matches in the menu
    /// </summary>
    /// <param name="startNode">The starting node to check from</param>
    /// <returns>Whether or not a match was found</returns>
    private bool DoesMenuHaveMatch(MenuTreeNode startNode)
    {
        if (!string.IsNullOrEmpty(startNode.NavigateUrl) && startNode.NavigateUrl != "/")
        {
            // Check for URL match
            if (Page.Request.RawUrl.ToLower().Contains(startNode.NavigateUrl.ToLower()))
            {
                return true;
            }
        }

        if (this.ContentId > 0 && !string.IsNullOrEmpty(startNode.ItemId))
        {
            // Check for content ID match
            if (this.ContentId.ToString() == startNode.ItemId)
            {
                return true;
            }
        }

        foreach (MenuTreeNode childNode in startNode.Items)
        {
            if (this.DoesMenuHaveMatch(childNode))
            {
                return true;
            }
        }

        return false;
    }

    /// <summary>
    /// Sets the ContentId and Content fields based on id or page id as specified in the query string
    /// </summary>
    private void SetContentParameters()
    {
        long parsedContentId = 0;

        if (!string.IsNullOrEmpty(Request.QueryString["id"]))
        {
            long.TryParse(Request.QueryString["id"], out parsedContentId);
        }
        else if (!string.IsNullOrEmpty(Request.QueryString["pageid"]))
        {
            long.TryParse(Request.QueryString["pageid"], out parsedContentId);
        }

        if (parsedContentId > 0)
        {
            this.ContentId = parsedContentId;
            ContentManager contentManager = new ContentManager();
            this.Content = contentManager.GetItem(this.ContentId, false);
        }
    }

    /// <summary>
    /// Class for passing menu item info to a handler for the MenuItemChanged event
    /// </summary>
    public class FlexMenuEventArgs : EventArgs
    {
        /// <summary>
        /// Gets or sets the name of the currently selected menu item.
        /// </summary>
        public string CurrentMenuName { get; set; }

        /// <summary>
        /// Gets or sets the id of the currently selected menu item.
        /// </summary>
        public long CurrentMenuItemId { get; set; }
    }
}