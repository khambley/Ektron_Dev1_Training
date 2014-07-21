if (Ektron === undefined) {
    Ektron = {};
}
if (Ektron.Com === undefined) {
    Ektron.Com = {};
}


Ektron.Com.Navigation = {
    init: function() {
        var animTime = 1000;
        var easingDownMethod = "easeOutExpo";
        var easingUpMethod = "easeInExpo";

        var toggleImage = $("div.ektron-menu-toggle a").find("img");

        $("html").on("click", function () {
            $("a.ektron-dropdown-toggle").removeClass("open");
            $(".ektron-dropdown-menu:visible").slideUp({ duration: animTime });
            // for small screen toggle
            if ($("div.ektron-menu-toggle a").hasClass("ektron-menu-open")) {
                var menu = $(".ektron-navigation-container");
                var menuInner = $(".ektron-nav-collapse");
                if (menu.is(":visible")) {
                    $(this).removeClass("ektron-menu-open");
                }
                menuInner.slideUp('fast', function() {
                    $(this).find(".ektron-dropdown-menu").hide();
                    $("a.ektron-dropdown-toggle").removeClass("open");
                    menu.hide();
                    menuInner.removeAttr("style");
                });
                toggleImage.css("text-indent", 0);
                toggleImage.animate(
                    { 'text-indent': 180 },
                    {
                        step: function(now, fx) {
                            $(this).css({
                                '-webkit-transform': 'rotate(' + (180 - now) + 'deg)',
                                '-moz-transform': 'rotate(' + (180 - now) + 'deg)',
                                '-ms-transform': 'rotate(' + (180 - now) + 'deg)',
                                '-o-transform': 'rotate(' + (180 - now) + 'deg)',
                                'transform': 'rotate(' + (180 - now) + 'deg)',
                                'zoom': 1
                            });
                        },
                        duration: animTime / 2
                    }, 'linear');
            }
        });
        $("a.ektron-dropdown-toggle").on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            var link = $(this);
            var menu = $(this).parent().find(".ektron-dropdown-menu");
            if ($(window).width() > 767) {
                $(".ektron-dropdown-menu:visible").not(menu).hide(animTime, function() { $(this).removeAttr("style"); });
            } else {
                $(".ektron-dropdown-menu:visible").not(menu).slideUp(animTime, function() { $(this).removeAttr("style"); });
            }
            $("a.ektron-dropdown-toggle").not(link).removeClass("open");
            if (menu.is(":visible")) {
                link.removeClass("open");
                menu.slideUp({ duration: animTime, callback: function() { $(this).removeAttr("style"); } });
            } else {
                link.addClass("open");
                menu.slideDown({ duration: animTime });
            }
        });
        $("div.ektron-menu-toggle a").on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();

            var menu = $(".ektron-navigation-container");
            var menuInner = $(".ektron-nav-collapse");
            if (menu.is(":visible")) {
                // close the menu
                $(this).removeClass("ektron-menu-open");
                menuInner.slideUp('fast', function() {
                    $(this).find(".ektron-dropdown-menu").hide();
                    $("a.ektron-dropdown-toggle").removeClass("open");
                    menu.hide();
                    menuInner.removeAttr("style");
                });
                toggleImage.css("text-indent", 0);
                toggleImage.animate(
                    { 'text-indent': +180 },
                    {
                        step: function(now, fx) {
                            $(this).css({
                                '-webkit-transform': 'rotate(' + (180 - now) + 'deg)',
                                '-moz-transform': 'rotate(' + (180 - now) + 'deg)',
                                '-ms-transform': 'rotate(' + (180 - now) + 'deg)',
                                '-o-transform': 'rotate(' + (180 - now) + 'deg)',
                                'transform': 'rotate(' + (180 - now) + 'deg)',
                                'zoom': 1
                            });
                            if (180 - now == 0) {
                                menu.removeAttr("style");
                            }
                        },
                        duration: animTime / 2
                    }, 'linear');
            } else {
                // open the menu
                $(this).addClass("ektron-menu-open");
                menu.show();
                menuInner.find(".ektron-dropdown-menu:visible").hide();
                menuInner.slideDown({ duration: animTime });
                toggleImage.css("text-indent", 0);
                toggleImage.animate(
                    { 'text-indent': +180 },
                    {
                        step: function(now, fx) {
                            $(this).css({
                                '-webkit-transform': 'rotate(' + now + 'deg)',
                                '-moz-transform': 'rotate(' + now + 'deg)',
                                '-ms-transform': 'rotate(' + now + 'deg)',
                                '-o-transform': 'rotate(' + now + 'deg)',
                                'transform': 'rotate(' + now + 'deg)',
                                'zoom': 1
                            });
                        },
                        duration: animTime / 2
                    }, 'linear');
            }
        });
        $(".ektron-header-navigation").on("click", function(e) {
            e.stopPropagation();
        });
    }
};
Ektron.Com.Functions = {
    DoOnResize: function(width, condition, callback) {
        var timeoutOffset = false;
        $(window).resize(function() {
            var doFunction = false;
            if (condition == "greaterThan" && $(window).width() > width) {
                doFunction = true;
            }
            if (condition == "lessThan" && $(window).width() < width) {
                doFunction = true;
            }
            if (doFunction) {
                if (timeoutOffset !== false)
                    clearTimeout(timeoutOffset);
                timeoutOffset = setTimeout(function() { callback }, 200);
            }
        });
    },
    SwapImageForAltText: function(selector) {
        var img = $(selector);
        var parent = $(selector).parent();
        if (img.attr("alt") != '') {
            parent.html(img.attr('alt'));
        }
    },
    SetCTAImageDimensions: function(selector) {
        var img = $(selector);
        img.css({ "width": "auto", "height": "auto" });
    },
    SetPageBackground: function(url) {
        $("form #pagewrapper").css("background", "transparent url('" + url + "') center top no-repeat");
    },
    SetStickyNavigation: function(ContainerID, Child, Class) {
        var FixingNode = $("#" + ContainerID + " " + Child);
        if ($.waypoints('viewportHeight') >= FixingNode.height()) {
            FixingNode.waypoint(function(event, direction) {
                $(this).toggleClass(Class, direction === "down");
                event.stopPropagation();
            });
        } else {
            //
        }
    },
    SetWayPoints: function(LinkContainer, Class) {
        $("#" + LinkContainer + " a[href^='#']").each(function() {
            Ektron.Com.Functions.SetWayPoint(LinkContainer, $(this).attr("href").replace('#', ''), Class);
        });
    },
    SetWayPoint: function(LinkContainer, Entry, Class) {
        $("a[name='" + Entry + "']").waypoint(function(event, direction) {
            if (direction === "down") {
                $("#" + LinkContainer + " a[href^='#']").removeClass(Class);
                $("a[href='#" + Entry + "']").addClass(Class);
            } else if (direction === "up") {
                $("#" + LinkContainer + " a[href^='#']").removeClass(Class);
                $("a[href='#" + Entry + "']").parent().prev().find("a[href^='#']").addClass(Class);
            }
        }, { offset: '50%' });
    },
    SetScrollLinks: function(ContainerID, Class) {
        // Smooth scrolling for internal links
        $("#" + ContainerID + " a." + Class + "[href^='#']").click(function(event) {
            var scrollElement = 'html, body';
            event.preventDefault();
            var $this = $(this), target = this.hash.replace('#', ''), $target = $("a[name='" + target + "']");
            $(scrollElement).stop().animate({
                    'scrollTop': $target.offset().top
                }, 500, 'swing', function() {
                    window.location.hash = target;
                });
        });
    },
    LoadSocialControls: function() {
        var hasTwitterButtons = false;
        var hasFacebookButtons = false;
        var hasLinkedInButtons = false;
        var hasGooglePlusButtons = false;

        var $twitter = $(".ektron-twitter-share.doSet");
        var $facebook = $(".ektron-facebook-share.doSet");
        var $linkedin = $(".ektron-linkedin-share.doSet")
        var $google = $(".ektron-google-share.doSet");

        if ($twitter.length > 0) hasTwitterButtons = true;
        if ($facebook.length > 0) hasFacebookButtons = true;
        if ($linkedin.length > 0) hasLinkedInButtons = true;
        if ($google.length > 0) hasGooglePlusButtons = true;

        if (hasTwitterButtons) {
            if (typeof(twttr) != 'undefined') {
                twttr.widgets.load();
            } else {
                $.getScript('//platform.twitter.com/widgets.js');
            }
            $twitter.removeClass("doSet");
        }

        if (hasFacebookButtons) {
            if (typeof(FB) != 'undefined') {
                $facebook.each(function() {
                    FB.XFBML.parse($(this).get(0));
                });
            } else {
                $.getScript('//connect.facebook.net/en_US/all.js#xfbml=1', function() {
                    FB.init({ status: true, cookie: true, xfbml: true });
                });
            }
            $facebook.removeClass("doSet");
        }

        if (hasLinkedInButtons) {
            if (typeof(IN) != 'undefined') {
                IN.parse();
            } else {
                $.getScript('//platform.linkedin.com/in.js');
            }
            $linkedin.removeClass("doSet");
        }

        if (hasGooglePlusButtons) {
            if (typeof(gapi) != 'undefined') {
                $google.find(".g-plusone").each(function() {
                    gapi.plusone.render($(this).get(0), { "size": "tall", "annotation": "none" });
                });
            } else {
                $.getScript('https://apis.google.com/js/plusone.js');
            }
            $google.removeClass("doSet");
        }
    },
    PhotoSwipe: function() {
        var swipeClass = "ektron-photoswipe";
        var triggerClass = "ektron-photoswipe-trigger";

        var ps = $("." + swipeClass + " a").photoSwipe({
            captionAndToolbarAutoHideDelay: 0,
            enableKeyboard: false,
            enableMouseWheel: false,
            loop: false,
            preventSlideshow: true
        });

        //        $(document).on("keyup", function (e) {
        //            if (e.keyCode == 13 || e.keyCode == 27) {
        //                if(ps != undefined)
        //                    ps.hide();
        //                //$(this).off("keyup");
        //            }
        //        });
        $("a." + triggerClass).click(function(e) {
            e.preventDefault();
            ps.show(0);
            $(document).on("keyup", function(e) {
                if (e.keyCode == 13 || e.keyCode == 27) {
                    ps.hide();
                    $(this).off("keyup");
                }
            });
        });
    },
    SetVideoLinks: function(settings) {
        if (settings.ContainerID != undefined) {
            $videoPlayer = $("#" + settings.ContainerID + " div.ektron-bc-wrapper");
            $videoLinks = $("#" + settings.ContainerID + " a.ektron-play-video");
            $videoLinks.click(function(e) {
                e.preventDefault();
                var newCode = $(this).comments().html();
                $videoPlayer.html(newCode);
                if (newCode.indexOf("data-video") == -1) {
                    $(".ektron-bc-wrapper").css({ "height": "0px", "padding-bottom": "56.25%" });
                    brightcove.createExperiences();
                } else {
                    $(".ektron-bc-wrapper").css({ "height": "auto", "padding-bottom": "0px" });
                }
            });
            $firstLink = $videoLinks.first();
            firstEmbed = $firstLink.comments().html();
            if (firstEmbed.indexOf("data-video") == -1) {
                $(".ektron-bc-wrapper").css({ "height": "0px", "padding-bottom": "56.25%" });
            }
        }
    },
    FilterListItems: function(containerClass, commonClass, showClass) {
        if (showClass == "") {
            $("." + containerClass + " ." + commonClass).show();
        } else {
            $("." + containerClass + " ." + commonClass).hide();
            $("." + containerClass + " ." + showClass).show();
        }
    },
    ChildProofField: function(fieldId, triggerId, action) {
        $("#" + triggerId).on(action, function() {
            $("#" + fieldId).val($("#" + fieldId).val().replace(/</g, "&lt;").replace(/>/g, "&gt;"));
        });
    },
    SetExternalLinksTarget: function(container, ctype) {
        if (ctype == "class") {
            $("." + container).find("a[href^='http://'], a[href^='https://']").attr("target", "_blank");
        } else if (ctype == "id") {
            $("#" + container).find("a[href^='http://'], a[href^='https://']").attr("target", "_blank");
        } else if (ctype == "element") {
            $(container).find("a[href^='http://'], a[href^='https://']").attr("target", "_blank");
        }
    },
    SetBlueListIndicators: function(container, ctype) {
        if (ctype == "class") {
            $("." + container).find("ul:not('.nav')").children("li").each(function(e) {
                $(this).wrapInner("<span class='ektron-body-grey' />");
                if ($(this).parent().prop("tagName") == "UL") {
                    $(this).parent("ul").addClass('ektron-blue');
                } else {
                    $(this).parent("ol").addClass('ektron-blue');
                }
            });
        } else if (ctype == "id") {
            $("#" + container).find("ul:not('.nav')").children("li").each(function(e) {
                $(this).wrapInner("<span class='ektron-body-grey' />");
                if ($(this).parent().prop("tagName") == "UL") {
                    $(this).parent("ul").addClass('ektron-blue');
                } else {
                    $(this).parent("ol").addClass('ektron-blue');
                }
            });
        } else if (ctype == "element") {
            $(container).find("ul:not(.nav)").children("li").each(function(e) {
                $(this).wrapInner("<span class='ektron-body-grey' />");
                if ($(this).parent().prop("tagName") == "UL") {
                    $(this).parent("ul").addClass('ektron-blue');
                } else {
                    $(this).parent("ol").addClass('ektron-blue');
                }
            });
        }
    },
    StartLiveChat: function() {
        window.open('http://server.iad.liveperson.net/hc/47434280/?cmd=file&amp;file=visitorWantsToChat&amp;site=47434280&amp;byhref=1&amp;SESSIONVAR!skill=Call%20Center&amp;imageUrl=http://server.iad.liveperson.net/hcp/Gallery/ChatButton-Gallery/English/General/1a/', 'LiveChatWindow', 'width=480, height=600');
        return false;
    }
};
