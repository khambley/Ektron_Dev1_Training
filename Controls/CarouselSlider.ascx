<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CarouselSlider.ascx.cs" Inherits="Source_Controls_CarouselSlider" %>

<asp:ListView ID="lstSliderFigure" ItemPlaceholderID="phslidefigure" runat="server" >
    <LayoutTemplate>
        <div class="swipe ektron-swipe-slider" style="visibility: visible" id="swipeux">
            <div class="swipe-wrap" style="width: 7020px">
                <asp:PlaceHolder ID="phslidefigure" runat="server"></asp:PlaceHolder>
            </div>
        </div>
    </LayoutTemplate>
    <ItemTemplate>
        <div class="ektron-swipe-item" style="width: 1170px; display: block">
            <figure class="ektron-slider-figure" 
                data-media1200="<%#Eval("LargeImage")%>"
                data-media="<%#Eval("LargeImage")%>"
                data-media980="<%#Eval("Image940")%>"
                data-media768="<%#Eval("Image724")%>">
				<a href="<%#Eval("Link")%>"></a>
            </figure>
            <div class="ektron-alternate-view" data-color="#ffffff" style="color: #000000;">
                <div class="ektron-alternate-image">
                    <img src="<%#Eval("SmallImage")%>" /></div>
                <div class="ektron-alternate-link">
                    <a href="<%#Eval("Link")%>" target="_self" style="color: #000000;">
                    </a>
                </div>
                <div class="ektron-alternate-text">
                    <span class='ektron-alternate-quote' style='color: #000000'></span>View Trek-On
                    Travel's Recommended Attractions<span class='ektron-alternate-quote' style='color: #000000'></span></div>
            </div>
        </div>
    </ItemTemplate>
</asp:ListView>
<asp:ListView ID="lstThumbnailIcon" ItemPlaceholderID="phThumbnailIcon" runat="server">
    <LayoutTemplate>
        <div class="ektron-slide-thumbnail-list">
            <asp:PlaceHolder ID="phThumbnailIcon" runat="server"></asp:PlaceHolder>
        </div>
    </LayoutTemplate>
    <ItemTemplate>
        <a href="#" class="ektron-slide-thumbnail" data-left="ffffff" data-right="ffffff">
        <img src="<%#Eval("Icon")%>" alt="" />
        </a>
    </ItemTemplate>
</asp:ListView>
