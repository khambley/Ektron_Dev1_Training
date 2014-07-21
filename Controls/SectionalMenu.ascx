<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SectionalMenu.ascx.cs" Inherits="Source_Controls_SectionalMenu" %>
<%@ Register Assembly="Ektron.Cms.Framework.UI.Controls" Namespace="Ektron.Cms.Framework.UI.Controls.Views" TagPrefix="cc2" %>
<%@ Register Assembly="Ektron.Cms.Framework.UI.Controls" Namespace="Ektron.Cms.Framework.UI.Controls" TagPrefix="cc1" %>
<%@ Register src="~/Source/Controls/MainMenu.ascx" TagName="MainMenu" TagPrefix="uc1" %>
<style>
    li.hideme, div.hidelevel3 {
        display: none;
    }
    div.showlevel3 {
        display: list-item;
    }
</style>
<cc1:MenuModelSource ID="UxSlaveMenuModelSource" runat="server">

</cc1:MenuModelSource>
<cc2:MenuView ID="UxSlaveMenuView" ModelSourceID="UxSlaveMenuModelSource" runat="server">
    <ListTemplate>
        <ul id="Leftmenunav" class="ektron-body-nav">
            <asp:PlaceHolder ID="listPlaceHolder" runat="server"></asp:PlaceHolder>
        </ul>
    </ListTemplate>
    <ItemTemplate>
        <li class='<%#((Eval("Level").ToString()=="2")) ? "submenu" : ""%>'> <asp:HyperLink ID="nodeLink" runat="server" Text='<%#Eval("Text") %>' NavigateUrl='<%#Eval("NavigateUrl") %>' class='<%# (Boolean.Parse(Eval("Selected").ToString())) ? @"active" : @"" %>' />
<asp:PlaceHolder ID="itemPlaceholder" runat="server"></asp:PlaceHolder>
</li> 
    </ItemTemplate>
</cc2:MenuView>
