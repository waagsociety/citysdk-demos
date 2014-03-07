

<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# githubog: http://ogp.me/ns/fb/githubog#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>topojson/topojson.js at master · mbostock/topojson · GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png" />
    <link rel="logo" type="image/svg" href="https://github-media-downloads.s3.amazonaws.com/github-logo.svg" />
    <meta property="og:image" content="https://a248.e.akamai.net/assets.github.com/images/modules/logos_page/Octocat.png">
    <link rel="assets" href="https://a248.e.akamai.net/assets.github.com/">
    <link rel="xhr-socket" href="/_sockets" />
    
    


    <meta name="msapplication-TileImage" content="/windows-tile.png" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="selected-link" value="repo_source" data-pjax-transient />
    <meta content="collector.githubapp.com" name="octolytics-host" /><meta content="github" name="octolytics-app-id" />

    
    
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <meta content="authenticity_token" name="csrf-param" />
<meta content="9G26zIN50KbFjr7bxm8Yo3ae4niQDODLKy1a1f2l8IM=" name="csrf-token" />

    <link href="https://a248.e.akamai.net/assets.github.com/assets/github-7dcba9667e0f4a6d422bdb41f5d8f49d425c9c24.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://a248.e.akamai.net/assets.github.com/assets/github2-1ba35c8998f86af4160cf25c996d0e27ee06f105.css" media="all" rel="stylesheet" type="text/css" />
    


      <script src="https://a248.e.akamai.net/assets.github.com/assets/frameworks-1f72571b966545f4e27481a3b0ebbeeed4f2f139.js" type="text/javascript"></script>
      <script src="https://a248.e.akamai.net/assets.github.com/assets/github-3b51dd74a94c713c22309e373955e5fa02a3bb65.js" type="text/javascript"></script>
      
      <meta http-equiv="x-pjax-version" content="c5859fbe7df171d1daba49c0a8d7ede6">

        <link data-pjax-transient rel='permalink' href='/mbostock/topojson/blob/51b7e09c8eb92be52cb4c4e61fc6a0c891aa08a9/topojson.js'>

  <meta property="og:title" content="topojson"/>
  <meta property="og:type" content="githubog:gitrepository"/>
  <meta property="og:url" content="https://github.com/mbostock/topojson"/>
  <meta property="og:image" content="https://a248.e.akamai.net/assets.github.com/images/gravatars/gravatar-user-420.png"/>
  <meta property="og:site_name" content="GitHub"/>
  <meta property="og:description" content="topojson - An extension to GeoJSON that encodes topology."/>

  <meta name="description" content="topojson - An extension to GeoJSON that encodes topology." />

  <meta content="230541" name="octolytics-dimension-user_id" /><meta content="mbostock" name="octolytics-dimension-user_login" /><meta content="6714663" name="octolytics-dimension-repository_id" /><meta content="mbostock/topojson" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="6714663" name="octolytics-dimension-repository_network_root_id" /><meta content="mbostock/topojson" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/mbostock/topojson/commits/master.atom" rel="alternate" title="Recent Commits to topojson:master" type="application/atom+xml" />

  </head>


  <body class="logged_out page-blob macintosh vis-public env-production  kill-the-chrome">

    <div class="wrapper">
      
      
      

      
      <div class="header header-logged-out">
  <div class="container clearfix">

    <a class="header-logo-wordmark" href="https://github.com/">
      <span class="mega-octicon octicon-logo-github"></span>
    </a>

    <div class="header-actions">
      <a class="button primary" href="/signup">Sign up</a>
      <a class="button" href="/login?return_to=%2Fmbostock%2Ftopojson%2Fblob%2Fmaster%2Ftopojson.js">Sign in</a>
    </div>

    <div class="command-bar js-command-bar  in-repository">


      <ul class="top-nav">
          <li class="explore"><a href="/explore">Explore</a></li>
        <li class="features"><a href="/features">Features</a></li>
          <li class="enterprise"><a href="https://enterprise.github.com/">Enterprise</a></li>
          <li class="blog"><a href="/blog">Blog</a></li>
      </ul>
        <form accept-charset="UTF-8" action="/search" class="command-bar-form" id="top_search_form" method="get">

<input type="text" data-hotkey="/ s" name="q" id="js-command-bar-field" placeholder="Search or type a command" tabindex="1" autocapitalize="off"
    
    
      data-repo="mbostock/topojson"
      data-branch="master"
      data-sha="5b1a18a191a33f89360b9ed9ca04b4b98d6544bf"
  >

    <input type="hidden" name="nwo" value="mbostock/topojson" />

    <div class="select-menu js-menu-container js-select-menu search-context-select-menu">
      <span class="minibutton select-menu-button js-menu-target">
        <span class="js-select-button">This repository</span>
      </span>

      <div class="select-menu-modal-holder js-menu-content js-navigation-container">
        <div class="select-menu-modal">

          <div class="select-menu-item js-navigation-item selected">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" class="js-search-this-repository" name="search_target" value="repository" checked="checked" />
            <div class="select-menu-item-text js-select-button-text">This repository</div>
          </div> <!-- /.select-menu-item -->

          <div class="select-menu-item js-navigation-item">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" name="search_target" value="global" />
            <div class="select-menu-item-text js-select-button-text">All repositories</div>
          </div> <!-- /.select-menu-item -->

        </div>
      </div>
    </div>

  <span class="octicon help tooltipped downwards" title="Show command bar help">
    <span class="octicon octicon-question"></span>
  </span>


  <input type="hidden" name="ref" value="cmdform">

</form>
    </div>

  </div>
</div>


      


          <div class="site" itemscope itemtype="http://schema.org/WebPage">
    
    <div class="pagehead repohead instapaper_ignore readability-menu">
      <div class="container">
        

<ul class="pagehead-actions">


    <li>
      <a href="/login?return_to=%2Fmbostock%2Ftopojson"
        class="minibutton with-count js-toggler-target star-button entice tooltipped upwards"
        title="You must be signed in to use this feature" rel="nofollow">
        <span class="octicon octicon-star"></span>Star
      </a>
      <a class="social-count js-social-count" href="/mbostock/topojson/stargazers">
        530
      </a>
    </li>
    <li>
      <a href="/login?return_to=%2Fmbostock%2Ftopojson"
        class="minibutton with-count js-toggler-target fork-button entice tooltipped upwards"
        title="You must be signed in to fork a repository" rel="nofollow">
        <span class="octicon octicon-git-branch"></span>Fork
      </a>
      <a href="/mbostock/topojson/network" class="social-count">
        103
      </a>
    </li>
</ul>

        <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
          <span class="repo-label"><span>public</span></span>
          <span class="mega-octicon octicon-repo"></span>
          <span class="author">
            <a href="/mbostock" class="url fn" itemprop="url" rel="author"><span itemprop="title">mbostock</span></a></span
          ><span class="repohead-name-divider">/</span><strong
          ><a href="/mbostock/topojson" class="js-current-repository js-repo-home-link">topojson</a></strong>

          <span class="page-context-loader">
            <img alt="Octocat-spinner-32" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
          </span>

        </h1>
      </div><!-- /.container -->
    </div><!-- /.repohead -->

    <div class="container">

      <div class="repository-with-sidebar repo-container
            ">

          <div class="repository-sidebar">

              

<div class="repo-nav repo-nav-full js-repository-container-pjax js-octicon-loaders">
  <div class="repo-nav-contents">
    <ul class="repo-menu">
      <li class="tooltipped leftwards" title="Code">
        <a href="/mbostock/topojson" class="js-selected-navigation-item selected" data-gotokey="c" data-pjax="true" data-selected-links="repo_source repo_downloads repo_commits repo_tags repo_branches /mbostock/topojson">
          <span class="octicon octicon-code"></span> <span class="full-word">Code</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

        <li class="tooltipped leftwards" title="Issues">
          <a href="/mbostock/topojson/issues" class="js-selected-navigation-item js-disable-pjax" data-gotokey="i" data-selected-links="repo_issues /mbostock/topojson/issues">
            <span class="octicon octicon-issue-opened"></span> <span class="full-word">Issues</span>
            <span class='counter'>16</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>

      <li class="tooltipped leftwards" title="Pull Requests"><a href="/mbostock/topojson/pulls" class="js-selected-navigation-item js-disable-pjax" data-gotokey="p" data-selected-links="repo_pulls /mbostock/topojson/pulls">
            <span class="octicon octicon-git-pull-request"></span> <span class="full-word">Pull Requests</span>
            <span class='counter'>6</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>


        <li class="tooltipped leftwards" title="Wiki">
          <a href="/mbostock/topojson/wiki" class="js-selected-navigation-item " data-pjax="true" data-selected-links="repo_wiki /mbostock/topojson/wiki">
            <span class="octicon octicon-book"></span> <span class="full-word">Wiki</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>


    </ul>
    <div class="repo-menu-separator"></div>
    <ul class="repo-menu">

      <li class="tooltipped leftwards" title="Pulse">
        <a href="/mbostock/topojson/pulse" class="js-selected-navigation-item " data-pjax="true" data-selected-links="pulse /mbostock/topojson/pulse">
          <span class="octicon octicon-pulse"></span> <span class="full-word">Pulse</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped leftwards" title="Graphs">
        <a href="/mbostock/topojson/graphs" class="js-selected-navigation-item " data-pjax="true" data-selected-links="repo_graphs repo_contributors /mbostock/topojson/graphs">
          <span class="octicon octicon-graph"></span> <span class="full-word">Graphs</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped leftwards" title="Network">
        <a href="/mbostock/topojson/network" class="js-selected-navigation-item js-disable-pjax" data-selected-links="repo_network /mbostock/topojson/network">
          <span class="octicon octicon-git-branch"></span> <span class="full-word">Network</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

    </ul>

  </div>
</div>


              <div class="only-with-full-nav">

                

  

<div class="clone-url open"
  data-protocol-type="http"
  data-url="/users/set_protocol?protocol_selector=http&amp;protocol_type=clone">
  <h3><strong>HTTPS</strong> clone URL</h3>

  <input type="text" class="clone js-url-field"
         value="https://github.com/mbostock/topojson.git" readonly="readonly">

  <span class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="https://github.com/mbostock/topojson.git" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
</div>

  

<div class="clone-url "
  data-protocol-type="subversion"
  data-url="/users/set_protocol?protocol_selector=subversion&amp;protocol_type=clone">
  <h3><strong>Subversion</strong> checkout URL</h3>

  <input type="text" class="clone js-url-field"
         value="https://github.com/mbostock/topojson" readonly="readonly">

  <span class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="https://github.com/mbostock/topojson" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
</div>



<p class="clone-options">You can clone with
    <a href="#" class="js-clone-selector" data-protocol="http">HTTPS</a>,
    <a href="#" class="js-clone-selector" data-protocol="subversion">Subversion</a>,
  and <a href="https://help.github.com/articles/which-remote-url-should-i-use">other methods.</a>
</p>

  <a href="http://mac.github.com" class="minibutton sidebar-button">
    <span class="octicon octicon-device-desktop"></span>
    Clone in Desktop
  </a>



                  <a href="/mbostock/topojson/archive/master.zip"
                     class="minibutton sidebar-button"
                     title="Download this repository as a zip file"
                     rel="nofollow">
                    <span class="octicon octicon-cloud-download"></span>
                    Download ZIP
                  </a>

              </div>
          </div>

          <div id="js-repo-pjax-container" class="repository-content context-loader-container" data-pjax-container>
            


<!-- blob contrib key: blob_contributors:v21:2289d74368c72b7336681c60ce42c066 -->
<!-- blob contrib frag key: views10/v8/blob_contributors:v21:2289d74368c72b7336681c60ce42c066 -->


      <p title="This is a placeholder element" class="js-history-link-replace hidden"></p>

        <a href="/mbostock/topojson/find/master" data-pjax data-hotkey="t" style="display:none">Show File Finder</a>

        <div class="file-navigation">
          


<div class="select-menu js-menu-container js-select-menu" >
  <span class="minibutton select-menu-button js-menu-target" data-hotkey="w"
    data-master-branch="master"
    data-ref="master">
    <span class="octicon octicon-git-branch"></span>
    <i>branch:</i>
    <span class="js-select-button">master</span>
  </span>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax>

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <span class="select-menu-title">Switch branches/tags</span>
        <span class="octicon octicon-remove-close js-menu-close"></span>
      </div> <!-- /.select-menu-header -->

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" id="context-commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
            </li>
          </ul>
        </div><!-- /.select-menu-tabs -->
      </div><!-- /.select-menu-filters -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/exact-topology/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="exact-topology" rel="nofollow" title="exact-topology">exact-topology</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/fix-empty-polygon/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="fix-empty-polygon" rel="nofollow" title="fix-empty-polygon">fix-empty-polygon</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item selected">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/master/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="master" rel="nofollow" title="master">master</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/project/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="project" rel="nofollow" title="project">project</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/resimplify/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="resimplify" rel="nofollow" title="resimplify">resimplify</a>
            </div> <!-- /.select-menu-item -->
        </div>

          <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v1.1.4/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v1.1.4" rel="nofollow" title="v1.1.4">v1.1.4</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v1.1.3/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v1.1.3" rel="nofollow" title="v1.1.3">v1.1.3</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v1.1.2/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v1.1.2" rel="nofollow" title="v1.1.2">v1.1.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v1.1.1/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v1.1.1" rel="nofollow" title="v1.1.1">v1.1.1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v1.1.0/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v1.1.0" rel="nofollow" title="v1.1.0">v1.1.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v1.0.0/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v1.0.0" rel="nofollow" title="v1.0.0">v1.0.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.39/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.39" rel="nofollow" title="v0.0.39">v0.0.39</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.38/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.38" rel="nofollow" title="v0.0.38">v0.0.38</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.37/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.37" rel="nofollow" title="v0.0.37">v0.0.37</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.36/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.36" rel="nofollow" title="v0.0.36">v0.0.36</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.35/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.35" rel="nofollow" title="v0.0.35">v0.0.35</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.34/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.34" rel="nofollow" title="v0.0.34">v0.0.34</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.33/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.33" rel="nofollow" title="v0.0.33">v0.0.33</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.32/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.32" rel="nofollow" title="v0.0.32">v0.0.32</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.31/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.31" rel="nofollow" title="v0.0.31">v0.0.31</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.30/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.30" rel="nofollow" title="v0.0.30">v0.0.30</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.29/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.29" rel="nofollow" title="v0.0.29">v0.0.29</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.28/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.28" rel="nofollow" title="v0.0.28">v0.0.28</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.27/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.27" rel="nofollow" title="v0.0.27">v0.0.27</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.26/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.26" rel="nofollow" title="v0.0.26">v0.0.26</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.25/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.25" rel="nofollow" title="v0.0.25">v0.0.25</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.24/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.24" rel="nofollow" title="v0.0.24">v0.0.24</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.23/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.23" rel="nofollow" title="v0.0.23">v0.0.23</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.22/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.22" rel="nofollow" title="v0.0.22">v0.0.22</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.21/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.21" rel="nofollow" title="v0.0.21">v0.0.21</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.20/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.20" rel="nofollow" title="v0.0.20">v0.0.20</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.19/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.19" rel="nofollow" title="v0.0.19">v0.0.19</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.18/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.18" rel="nofollow" title="v0.0.18">v0.0.18</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.17/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.17" rel="nofollow" title="v0.0.17">v0.0.17</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.16/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.16" rel="nofollow" title="v0.0.16">v0.0.16</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.15/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.15" rel="nofollow" title="v0.0.15">v0.0.15</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.14/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.14" rel="nofollow" title="v0.0.14">v0.0.14</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.13/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.13" rel="nofollow" title="v0.0.13">v0.0.13</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.12/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.12" rel="nofollow" title="v0.0.12">v0.0.12</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.11/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.11" rel="nofollow" title="v0.0.11">v0.0.11</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.10/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.10" rel="nofollow" title="v0.0.10">v0.0.10</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.9/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.9" rel="nofollow" title="v0.0.9">v0.0.9</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.8/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.8" rel="nofollow" title="v0.0.8">v0.0.8</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.7/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.7" rel="nofollow" title="v0.0.7">v0.0.7</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.6/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.6" rel="nofollow" title="v0.0.6">v0.0.6</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/mbostock/topojson/blob/v0.0.5/topojson.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.5" rel="nofollow" title="v0.0.5">v0.0.5</a>
            </div> <!-- /.select-menu-item -->
        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

    </div> <!-- /.select-menu-modal -->
  </div> <!-- /.select-menu-modal-holder -->
</div> <!-- /.select-menu -->

          <div class="breadcrumb">
            <span class='repo-root js-repo-root'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/mbostock/topojson" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">topojson</span></a></span></span><span class="separator"> / </span><strong class="final-path">topojson.js</strong> <span class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="topojson.js" data-copied-hint="copied!" title="copy to clipboard"><span class="octicon octicon-clippy"></span></span>
          </div>
        </div>


        
  <div class="commit file-history-tease">
    <img class="main-avatar" height="24" src="https://secure.gravatar.com/avatar/005a27e09fe946ebef64bf4d134efc0a?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
    <span class="author"><a href="/mbostock" rel="author">mbostock</a></span>
    <time class="js-relative-date" datetime="2013-06-14T09:12:22-07:00" title="2013-06-14 09:12:22">June 14, 2013</time>
    <div class="commit-title">
        <a href="/mbostock/topojson/commit/9088e6931196c252a07865da91d6ca5d1feae0dd" class="message">Bump version number.</a>
    </div>

    <div class="participation">
      <p class="quickstat"><a href="#blob_contributors_box" rel="facebox"><strong>2</strong> contributors</a></p>
          <a class="avatar tooltipped downwards" title="mbostock" href="/mbostock/topojson/commits/master/topojson.js?author=mbostock"><img height="20" src="https://secure.gravatar.com/avatar/005a27e09fe946ebef64bf4d134efc0a?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="jasondavies" href="/mbostock/topojson/commits/master/topojson.js?author=jasondavies"><img height="20" src="https://secure.gravatar.com/avatar/f9dd9f4c2b8d081b67fe34769e24808e?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>


    </div>
    <div id="blob_contributors_box" style="display:none">
      <h2 class="facebox-header">Users who have contributed to this file</h2>
      <ul class="facebox-user-list">
        <li class="facebox-user-list-item">
          <img height="24" src="https://secure.gravatar.com/avatar/005a27e09fe946ebef64bf4d134efc0a?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/mbostock">mbostock</a>
        </li>
        <li class="facebox-user-list-item">
          <img height="24" src="https://secure.gravatar.com/avatar/f9dd9f4c2b8d081b67fe34769e24808e?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/jasondavies">jasondavies</a>
        </li>
      </ul>
    </div>
  </div>



        <div id="files" class="bubble">
          <div class="file">
            <div class="meta">
              <div class="info">
                <span class="icon"><b class="octicon octicon-file-text"></b></span>
                <span class="mode" title="File Mode">file</span>
                  <span>288 lines (249 sloc)</span>
                <span>8.856 kb</span>
              </div>
              <div class="actions">
                <div class="button-group">
                      <a class="minibutton js-entice" href=""
                         data-entice="You must be signed in and on a branch to make or propose changes">Edit</a>
                  <a href="/mbostock/topojson/raw/master/topojson.js" class="button minibutton " id="raw-url">Raw</a>
                    <a href="/mbostock/topojson/blame/master/topojson.js" class="button minibutton ">Blame</a>
                  <a href="/mbostock/topojson/commits/master/topojson.js" class="button minibutton " rel="nofollow">History</a>
                </div><!-- /.button-group -->
              </div><!-- /.actions -->

            </div>
                <div class="blob-wrapper data type-javascript js-blob-data">
      <table class="file-code file-diff">
        <tr class="file-code-line">
          <td class="blob-line-nums">
            <span id="L1" rel="#L1">1</span>
<span id="L2" rel="#L2">2</span>
<span id="L3" rel="#L3">3</span>
<span id="L4" rel="#L4">4</span>
<span id="L5" rel="#L5">5</span>
<span id="L6" rel="#L6">6</span>
<span id="L7" rel="#L7">7</span>
<span id="L8" rel="#L8">8</span>
<span id="L9" rel="#L9">9</span>
<span id="L10" rel="#L10">10</span>
<span id="L11" rel="#L11">11</span>
<span id="L12" rel="#L12">12</span>
<span id="L13" rel="#L13">13</span>
<span id="L14" rel="#L14">14</span>
<span id="L15" rel="#L15">15</span>
<span id="L16" rel="#L16">16</span>
<span id="L17" rel="#L17">17</span>
<span id="L18" rel="#L18">18</span>
<span id="L19" rel="#L19">19</span>
<span id="L20" rel="#L20">20</span>
<span id="L21" rel="#L21">21</span>
<span id="L22" rel="#L22">22</span>
<span id="L23" rel="#L23">23</span>
<span id="L24" rel="#L24">24</span>
<span id="L25" rel="#L25">25</span>
<span id="L26" rel="#L26">26</span>
<span id="L27" rel="#L27">27</span>
<span id="L28" rel="#L28">28</span>
<span id="L29" rel="#L29">29</span>
<span id="L30" rel="#L30">30</span>
<span id="L31" rel="#L31">31</span>
<span id="L32" rel="#L32">32</span>
<span id="L33" rel="#L33">33</span>
<span id="L34" rel="#L34">34</span>
<span id="L35" rel="#L35">35</span>
<span id="L36" rel="#L36">36</span>
<span id="L37" rel="#L37">37</span>
<span id="L38" rel="#L38">38</span>
<span id="L39" rel="#L39">39</span>
<span id="L40" rel="#L40">40</span>
<span id="L41" rel="#L41">41</span>
<span id="L42" rel="#L42">42</span>
<span id="L43" rel="#L43">43</span>
<span id="L44" rel="#L44">44</span>
<span id="L45" rel="#L45">45</span>
<span id="L46" rel="#L46">46</span>
<span id="L47" rel="#L47">47</span>
<span id="L48" rel="#L48">48</span>
<span id="L49" rel="#L49">49</span>
<span id="L50" rel="#L50">50</span>
<span id="L51" rel="#L51">51</span>
<span id="L52" rel="#L52">52</span>
<span id="L53" rel="#L53">53</span>
<span id="L54" rel="#L54">54</span>
<span id="L55" rel="#L55">55</span>
<span id="L56" rel="#L56">56</span>
<span id="L57" rel="#L57">57</span>
<span id="L58" rel="#L58">58</span>
<span id="L59" rel="#L59">59</span>
<span id="L60" rel="#L60">60</span>
<span id="L61" rel="#L61">61</span>
<span id="L62" rel="#L62">62</span>
<span id="L63" rel="#L63">63</span>
<span id="L64" rel="#L64">64</span>
<span id="L65" rel="#L65">65</span>
<span id="L66" rel="#L66">66</span>
<span id="L67" rel="#L67">67</span>
<span id="L68" rel="#L68">68</span>
<span id="L69" rel="#L69">69</span>
<span id="L70" rel="#L70">70</span>
<span id="L71" rel="#L71">71</span>
<span id="L72" rel="#L72">72</span>
<span id="L73" rel="#L73">73</span>
<span id="L74" rel="#L74">74</span>
<span id="L75" rel="#L75">75</span>
<span id="L76" rel="#L76">76</span>
<span id="L77" rel="#L77">77</span>
<span id="L78" rel="#L78">78</span>
<span id="L79" rel="#L79">79</span>
<span id="L80" rel="#L80">80</span>
<span id="L81" rel="#L81">81</span>
<span id="L82" rel="#L82">82</span>
<span id="L83" rel="#L83">83</span>
<span id="L84" rel="#L84">84</span>
<span id="L85" rel="#L85">85</span>
<span id="L86" rel="#L86">86</span>
<span id="L87" rel="#L87">87</span>
<span id="L88" rel="#L88">88</span>
<span id="L89" rel="#L89">89</span>
<span id="L90" rel="#L90">90</span>
<span id="L91" rel="#L91">91</span>
<span id="L92" rel="#L92">92</span>
<span id="L93" rel="#L93">93</span>
<span id="L94" rel="#L94">94</span>
<span id="L95" rel="#L95">95</span>
<span id="L96" rel="#L96">96</span>
<span id="L97" rel="#L97">97</span>
<span id="L98" rel="#L98">98</span>
<span id="L99" rel="#L99">99</span>
<span id="L100" rel="#L100">100</span>
<span id="L101" rel="#L101">101</span>
<span id="L102" rel="#L102">102</span>
<span id="L103" rel="#L103">103</span>
<span id="L104" rel="#L104">104</span>
<span id="L105" rel="#L105">105</span>
<span id="L106" rel="#L106">106</span>
<span id="L107" rel="#L107">107</span>
<span id="L108" rel="#L108">108</span>
<span id="L109" rel="#L109">109</span>
<span id="L110" rel="#L110">110</span>
<span id="L111" rel="#L111">111</span>
<span id="L112" rel="#L112">112</span>
<span id="L113" rel="#L113">113</span>
<span id="L114" rel="#L114">114</span>
<span id="L115" rel="#L115">115</span>
<span id="L116" rel="#L116">116</span>
<span id="L117" rel="#L117">117</span>
<span id="L118" rel="#L118">118</span>
<span id="L119" rel="#L119">119</span>
<span id="L120" rel="#L120">120</span>
<span id="L121" rel="#L121">121</span>
<span id="L122" rel="#L122">122</span>
<span id="L123" rel="#L123">123</span>
<span id="L124" rel="#L124">124</span>
<span id="L125" rel="#L125">125</span>
<span id="L126" rel="#L126">126</span>
<span id="L127" rel="#L127">127</span>
<span id="L128" rel="#L128">128</span>
<span id="L129" rel="#L129">129</span>
<span id="L130" rel="#L130">130</span>
<span id="L131" rel="#L131">131</span>
<span id="L132" rel="#L132">132</span>
<span id="L133" rel="#L133">133</span>
<span id="L134" rel="#L134">134</span>
<span id="L135" rel="#L135">135</span>
<span id="L136" rel="#L136">136</span>
<span id="L137" rel="#L137">137</span>
<span id="L138" rel="#L138">138</span>
<span id="L139" rel="#L139">139</span>
<span id="L140" rel="#L140">140</span>
<span id="L141" rel="#L141">141</span>
<span id="L142" rel="#L142">142</span>
<span id="L143" rel="#L143">143</span>
<span id="L144" rel="#L144">144</span>
<span id="L145" rel="#L145">145</span>
<span id="L146" rel="#L146">146</span>
<span id="L147" rel="#L147">147</span>
<span id="L148" rel="#L148">148</span>
<span id="L149" rel="#L149">149</span>
<span id="L150" rel="#L150">150</span>
<span id="L151" rel="#L151">151</span>
<span id="L152" rel="#L152">152</span>
<span id="L153" rel="#L153">153</span>
<span id="L154" rel="#L154">154</span>
<span id="L155" rel="#L155">155</span>
<span id="L156" rel="#L156">156</span>
<span id="L157" rel="#L157">157</span>
<span id="L158" rel="#L158">158</span>
<span id="L159" rel="#L159">159</span>
<span id="L160" rel="#L160">160</span>
<span id="L161" rel="#L161">161</span>
<span id="L162" rel="#L162">162</span>
<span id="L163" rel="#L163">163</span>
<span id="L164" rel="#L164">164</span>
<span id="L165" rel="#L165">165</span>
<span id="L166" rel="#L166">166</span>
<span id="L167" rel="#L167">167</span>
<span id="L168" rel="#L168">168</span>
<span id="L169" rel="#L169">169</span>
<span id="L170" rel="#L170">170</span>
<span id="L171" rel="#L171">171</span>
<span id="L172" rel="#L172">172</span>
<span id="L173" rel="#L173">173</span>
<span id="L174" rel="#L174">174</span>
<span id="L175" rel="#L175">175</span>
<span id="L176" rel="#L176">176</span>
<span id="L177" rel="#L177">177</span>
<span id="L178" rel="#L178">178</span>
<span id="L179" rel="#L179">179</span>
<span id="L180" rel="#L180">180</span>
<span id="L181" rel="#L181">181</span>
<span id="L182" rel="#L182">182</span>
<span id="L183" rel="#L183">183</span>
<span id="L184" rel="#L184">184</span>
<span id="L185" rel="#L185">185</span>
<span id="L186" rel="#L186">186</span>
<span id="L187" rel="#L187">187</span>
<span id="L188" rel="#L188">188</span>
<span id="L189" rel="#L189">189</span>
<span id="L190" rel="#L190">190</span>
<span id="L191" rel="#L191">191</span>
<span id="L192" rel="#L192">192</span>
<span id="L193" rel="#L193">193</span>
<span id="L194" rel="#L194">194</span>
<span id="L195" rel="#L195">195</span>
<span id="L196" rel="#L196">196</span>
<span id="L197" rel="#L197">197</span>
<span id="L198" rel="#L198">198</span>
<span id="L199" rel="#L199">199</span>
<span id="L200" rel="#L200">200</span>
<span id="L201" rel="#L201">201</span>
<span id="L202" rel="#L202">202</span>
<span id="L203" rel="#L203">203</span>
<span id="L204" rel="#L204">204</span>
<span id="L205" rel="#L205">205</span>
<span id="L206" rel="#L206">206</span>
<span id="L207" rel="#L207">207</span>
<span id="L208" rel="#L208">208</span>
<span id="L209" rel="#L209">209</span>
<span id="L210" rel="#L210">210</span>
<span id="L211" rel="#L211">211</span>
<span id="L212" rel="#L212">212</span>
<span id="L213" rel="#L213">213</span>
<span id="L214" rel="#L214">214</span>
<span id="L215" rel="#L215">215</span>
<span id="L216" rel="#L216">216</span>
<span id="L217" rel="#L217">217</span>
<span id="L218" rel="#L218">218</span>
<span id="L219" rel="#L219">219</span>
<span id="L220" rel="#L220">220</span>
<span id="L221" rel="#L221">221</span>
<span id="L222" rel="#L222">222</span>
<span id="L223" rel="#L223">223</span>
<span id="L224" rel="#L224">224</span>
<span id="L225" rel="#L225">225</span>
<span id="L226" rel="#L226">226</span>
<span id="L227" rel="#L227">227</span>
<span id="L228" rel="#L228">228</span>
<span id="L229" rel="#L229">229</span>
<span id="L230" rel="#L230">230</span>
<span id="L231" rel="#L231">231</span>
<span id="L232" rel="#L232">232</span>
<span id="L233" rel="#L233">233</span>
<span id="L234" rel="#L234">234</span>
<span id="L235" rel="#L235">235</span>
<span id="L236" rel="#L236">236</span>
<span id="L237" rel="#L237">237</span>
<span id="L238" rel="#L238">238</span>
<span id="L239" rel="#L239">239</span>
<span id="L240" rel="#L240">240</span>
<span id="L241" rel="#L241">241</span>
<span id="L242" rel="#L242">242</span>
<span id="L243" rel="#L243">243</span>
<span id="L244" rel="#L244">244</span>
<span id="L245" rel="#L245">245</span>
<span id="L246" rel="#L246">246</span>
<span id="L247" rel="#L247">247</span>
<span id="L248" rel="#L248">248</span>
<span id="L249" rel="#L249">249</span>
<span id="L250" rel="#L250">250</span>
<span id="L251" rel="#L251">251</span>
<span id="L252" rel="#L252">252</span>
<span id="L253" rel="#L253">253</span>
<span id="L254" rel="#L254">254</span>
<span id="L255" rel="#L255">255</span>
<span id="L256" rel="#L256">256</span>
<span id="L257" rel="#L257">257</span>
<span id="L258" rel="#L258">258</span>
<span id="L259" rel="#L259">259</span>
<span id="L260" rel="#L260">260</span>
<span id="L261" rel="#L261">261</span>
<span id="L262" rel="#L262">262</span>
<span id="L263" rel="#L263">263</span>
<span id="L264" rel="#L264">264</span>
<span id="L265" rel="#L265">265</span>
<span id="L266" rel="#L266">266</span>
<span id="L267" rel="#L267">267</span>
<span id="L268" rel="#L268">268</span>
<span id="L269" rel="#L269">269</span>
<span id="L270" rel="#L270">270</span>
<span id="L271" rel="#L271">271</span>
<span id="L272" rel="#L272">272</span>
<span id="L273" rel="#L273">273</span>
<span id="L274" rel="#L274">274</span>
<span id="L275" rel="#L275">275</span>
<span id="L276" rel="#L276">276</span>
<span id="L277" rel="#L277">277</span>
<span id="L278" rel="#L278">278</span>
<span id="L279" rel="#L279">279</span>
<span id="L280" rel="#L280">280</span>
<span id="L281" rel="#L281">281</span>
<span id="L282" rel="#L282">282</span>
<span id="L283" rel="#L283">283</span>
<span id="L284" rel="#L284">284</span>
<span id="L285" rel="#L285">285</span>
<span id="L286" rel="#L286">286</span>
<span id="L287" rel="#L287">287</span>

          </td>
          <td class="blob-line-code">
                  <div class="highlight"><pre><div class='line' id='LC1'><span class="nx">topojson</span> <span class="o">=</span> <span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC2'><br/></div><div class='line' id='LC3'>&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">merge</span><span class="p">(</span><span class="nx">topology</span><span class="p">,</span> <span class="nx">arcs</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC4'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">arcsByEnd</span> <span class="o">=</span> <span class="p">{},</span></div><div class='line' id='LC5'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fragmentByStart</span> <span class="o">=</span> <span class="p">{},</span></div><div class='line' id='LC6'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fragmentByEnd</span> <span class="o">=</span> <span class="p">{};</span></div><div class='line' id='LC7'><br/></div><div class='line' id='LC8'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">arcs</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC9'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">e</span> <span class="o">=</span> <span class="nx">ends</span><span class="p">(</span><span class="nx">i</span><span class="p">);</span></div><div class='line' id='LC10'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">(</span><span class="nx">arcsByEnd</span><span class="p">[</span><span class="nx">e</span><span class="p">[</span><span class="mi">0</span><span class="p">]]</span> <span class="o">||</span> <span class="p">(</span><span class="nx">arcsByEnd</span><span class="p">[</span><span class="nx">e</span><span class="p">[</span><span class="mi">0</span><span class="p">]]</span> <span class="o">=</span> <span class="p">[])).</span><span class="nx">push</span><span class="p">(</span><span class="nx">i</span><span class="p">);</span></div><div class='line' id='LC11'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">(</span><span class="nx">arcsByEnd</span><span class="p">[</span><span class="nx">e</span><span class="p">[</span><span class="mi">1</span><span class="p">]]</span> <span class="o">||</span> <span class="p">(</span><span class="nx">arcsByEnd</span><span class="p">[</span><span class="nx">e</span><span class="p">[</span><span class="mi">1</span><span class="p">]]</span> <span class="o">=</span> <span class="p">[])).</span><span class="nx">push</span><span class="p">(</span><span class="o">~</span><span class="nx">i</span><span class="p">);</span></div><div class='line' id='LC12'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">});</span></div><div class='line' id='LC13'><br/></div><div class='line' id='LC14'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">arcs</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC15'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">e</span> <span class="o">=</span> <span class="nx">ends</span><span class="p">(</span><span class="nx">i</span><span class="p">),</span></div><div class='line' id='LC16'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">start</span> <span class="o">=</span> <span class="nx">e</span><span class="p">[</span><span class="mi">0</span><span class="p">],</span></div><div class='line' id='LC17'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">end</span> <span class="o">=</span> <span class="nx">e</span><span class="p">[</span><span class="mi">1</span><span class="p">],</span></div><div class='line' id='LC18'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">f</span><span class="p">,</span> <span class="nx">g</span><span class="p">;</span></div><div class='line' id='LC19'><br/></div><div class='line' id='LC20'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">f</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">start</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC21'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">f</span><span class="p">.</span><span class="nx">end</span><span class="p">];</span></div><div class='line' id='LC22'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">f</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">i</span><span class="p">);</span></div><div class='line' id='LC23'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">f</span><span class="p">.</span><span class="nx">end</span> <span class="o">=</span> <span class="nx">end</span><span class="p">;</span></div><div class='line' id='LC24'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">g</span> <span class="o">=</span> <span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">end</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC25'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">g</span><span class="p">.</span><span class="nx">start</span><span class="p">];</span></div><div class='line' id='LC26'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">fg</span> <span class="o">=</span> <span class="nx">g</span> <span class="o">===</span> <span class="nx">f</span> <span class="o">?</span> <span class="nx">f</span> <span class="o">:</span> <span class="nx">f</span><span class="p">.</span><span class="nx">concat</span><span class="p">(</span><span class="nx">g</span><span class="p">);</span></div><div class='line' id='LC27'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">fg</span><span class="p">.</span><span class="nx">start</span> <span class="o">=</span> <span class="nx">f</span><span class="p">.</span><span class="nx">start</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">fg</span><span class="p">.</span><span class="nx">end</span> <span class="o">=</span> <span class="nx">g</span><span class="p">.</span><span class="nx">end</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fg</span><span class="p">;</span></div><div class='line' id='LC28'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">g</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">end</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC29'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">g</span><span class="p">.</span><span class="nx">start</span><span class="p">];</span></div><div class='line' id='LC30'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">g</span><span class="p">.</span><span class="nx">end</span><span class="p">];</span></div><div class='line' id='LC31'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">fg</span> <span class="o">=</span> <span class="nx">f</span><span class="p">.</span><span class="nx">concat</span><span class="p">(</span><span class="nx">g</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="o">~</span><span class="nx">i</span><span class="p">;</span> <span class="p">}).</span><span class="nx">reverse</span><span class="p">());</span></div><div class='line' id='LC32'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">fg</span><span class="p">.</span><span class="nx">start</span> <span class="o">=</span> <span class="nx">f</span><span class="p">.</span><span class="nx">start</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">fg</span><span class="p">.</span><span class="nx">end</span> <span class="o">=</span> <span class="nx">g</span><span class="p">.</span><span class="nx">start</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fg</span><span class="p">;</span></div><div class='line' id='LC33'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC34'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">f</span><span class="p">.</span><span class="nx">start</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">f</span><span class="p">.</span><span class="nx">end</span><span class="p">]</span> <span class="o">=</span> <span class="nx">f</span><span class="p">;</span></div><div class='line' id='LC35'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC36'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">f</span> <span class="o">=</span> <span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">end</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC37'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">f</span><span class="p">.</span><span class="nx">start</span><span class="p">];</span></div><div class='line' id='LC38'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">f</span><span class="p">.</span><span class="nx">unshift</span><span class="p">(</span><span class="nx">i</span><span class="p">);</span></div><div class='line' id='LC39'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">f</span><span class="p">.</span><span class="nx">start</span> <span class="o">=</span> <span class="nx">start</span><span class="p">;</span></div><div class='line' id='LC40'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">g</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">start</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC41'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">g</span><span class="p">.</span><span class="nx">end</span><span class="p">];</span></div><div class='line' id='LC42'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">gf</span> <span class="o">=</span> <span class="nx">g</span> <span class="o">===</span> <span class="nx">f</span> <span class="o">?</span> <span class="nx">f</span> <span class="o">:</span> <span class="nx">g</span><span class="p">.</span><span class="nx">concat</span><span class="p">(</span><span class="nx">f</span><span class="p">);</span></div><div class='line' id='LC43'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">gf</span><span class="p">.</span><span class="nx">start</span> <span class="o">=</span> <span class="nx">g</span><span class="p">.</span><span class="nx">start</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">gf</span><span class="p">.</span><span class="nx">end</span> <span class="o">=</span> <span class="nx">f</span><span class="p">.</span><span class="nx">end</span><span class="p">]</span> <span class="o">=</span> <span class="nx">gf</span><span class="p">;</span></div><div class='line' id='LC44'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">g</span> <span class="o">=</span> <span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">start</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC45'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">g</span><span class="p">.</span><span class="nx">start</span><span class="p">];</span></div><div class='line' id='LC46'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">g</span><span class="p">.</span><span class="nx">end</span><span class="p">];</span></div><div class='line' id='LC47'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">gf</span> <span class="o">=</span> <span class="nx">g</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="o">~</span><span class="nx">i</span><span class="p">;</span> <span class="p">}).</span><span class="nx">reverse</span><span class="p">().</span><span class="nx">concat</span><span class="p">(</span><span class="nx">f</span><span class="p">);</span></div><div class='line' id='LC48'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">gf</span><span class="p">.</span><span class="nx">start</span> <span class="o">=</span> <span class="nx">g</span><span class="p">.</span><span class="nx">end</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">gf</span><span class="p">.</span><span class="nx">end</span> <span class="o">=</span> <span class="nx">f</span><span class="p">.</span><span class="nx">end</span><span class="p">]</span> <span class="o">=</span> <span class="nx">gf</span><span class="p">;</span></div><div class='line' id='LC49'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC50'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">f</span><span class="p">.</span><span class="nx">start</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">f</span><span class="p">.</span><span class="nx">end</span><span class="p">]</span> <span class="o">=</span> <span class="nx">f</span><span class="p">;</span></div><div class='line' id='LC51'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC52'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">f</span> <span class="o">=</span> <span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">start</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC53'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">f</span><span class="p">.</span><span class="nx">start</span><span class="p">];</span></div><div class='line' id='LC54'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">f</span><span class="p">.</span><span class="nx">unshift</span><span class="p">(</span><span class="o">~</span><span class="nx">i</span><span class="p">);</span></div><div class='line' id='LC55'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">f</span><span class="p">.</span><span class="nx">start</span> <span class="o">=</span> <span class="nx">end</span><span class="p">;</span></div><div class='line' id='LC56'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">g</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">end</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC57'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">g</span><span class="p">.</span><span class="nx">end</span><span class="p">];</span></div><div class='line' id='LC58'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">gf</span> <span class="o">=</span> <span class="nx">g</span> <span class="o">===</span> <span class="nx">f</span> <span class="o">?</span> <span class="nx">f</span> <span class="o">:</span> <span class="nx">g</span><span class="p">.</span><span class="nx">concat</span><span class="p">(</span><span class="nx">f</span><span class="p">);</span></div><div class='line' id='LC59'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">gf</span><span class="p">.</span><span class="nx">start</span> <span class="o">=</span> <span class="nx">g</span><span class="p">.</span><span class="nx">start</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">gf</span><span class="p">.</span><span class="nx">end</span> <span class="o">=</span> <span class="nx">f</span><span class="p">.</span><span class="nx">end</span><span class="p">]</span> <span class="o">=</span> <span class="nx">gf</span><span class="p">;</span></div><div class='line' id='LC60'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">g</span> <span class="o">=</span> <span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">end</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC61'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">g</span><span class="p">.</span><span class="nx">start</span><span class="p">];</span></div><div class='line' id='LC62'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">g</span><span class="p">.</span><span class="nx">end</span><span class="p">];</span></div><div class='line' id='LC63'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">gf</span> <span class="o">=</span> <span class="nx">g</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="o">~</span><span class="nx">i</span><span class="p">;</span> <span class="p">}).</span><span class="nx">reverse</span><span class="p">().</span><span class="nx">concat</span><span class="p">(</span><span class="nx">f</span><span class="p">);</span></div><div class='line' id='LC64'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">gf</span><span class="p">.</span><span class="nx">start</span> <span class="o">=</span> <span class="nx">g</span><span class="p">.</span><span class="nx">end</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">gf</span><span class="p">.</span><span class="nx">end</span> <span class="o">=</span> <span class="nx">f</span><span class="p">.</span><span class="nx">end</span><span class="p">]</span> <span class="o">=</span> <span class="nx">gf</span><span class="p">;</span></div><div class='line' id='LC65'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC66'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">f</span><span class="p">.</span><span class="nx">start</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">f</span><span class="p">.</span><span class="nx">end</span><span class="p">]</span> <span class="o">=</span> <span class="nx">f</span><span class="p">;</span></div><div class='line' id='LC67'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC68'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">f</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">end</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC69'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">f</span><span class="p">.</span><span class="nx">end</span><span class="p">];</span></div><div class='line' id='LC70'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">f</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="o">~</span><span class="nx">i</span><span class="p">);</span></div><div class='line' id='LC71'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">f</span><span class="p">.</span><span class="nx">end</span> <span class="o">=</span> <span class="nx">start</span><span class="p">;</span></div><div class='line' id='LC72'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">g</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">start</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC73'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">g</span><span class="p">.</span><span class="nx">start</span><span class="p">];</span></div><div class='line' id='LC74'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">fg</span> <span class="o">=</span> <span class="nx">g</span> <span class="o">===</span> <span class="nx">f</span> <span class="o">?</span> <span class="nx">f</span> <span class="o">:</span> <span class="nx">f</span><span class="p">.</span><span class="nx">concat</span><span class="p">(</span><span class="nx">g</span><span class="p">);</span></div><div class='line' id='LC75'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">fg</span><span class="p">.</span><span class="nx">start</span> <span class="o">=</span> <span class="nx">f</span><span class="p">.</span><span class="nx">start</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">fg</span><span class="p">.</span><span class="nx">end</span> <span class="o">=</span> <span class="nx">g</span><span class="p">.</span><span class="nx">end</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fg</span><span class="p">;</span></div><div class='line' id='LC76'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">g</span> <span class="o">=</span> <span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">start</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC77'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">g</span><span class="p">.</span><span class="nx">start</span><span class="p">];</span></div><div class='line' id='LC78'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">delete</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">g</span><span class="p">.</span><span class="nx">end</span><span class="p">];</span></div><div class='line' id='LC79'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">fg</span> <span class="o">=</span> <span class="nx">f</span><span class="p">.</span><span class="nx">concat</span><span class="p">(</span><span class="nx">g</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="o">~</span><span class="nx">i</span><span class="p">;</span> <span class="p">}).</span><span class="nx">reverse</span><span class="p">());</span></div><div class='line' id='LC80'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">fg</span><span class="p">.</span><span class="nx">start</span> <span class="o">=</span> <span class="nx">f</span><span class="p">.</span><span class="nx">start</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">fg</span><span class="p">.</span><span class="nx">end</span> <span class="o">=</span> <span class="nx">g</span><span class="p">.</span><span class="nx">start</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fg</span><span class="p">;</span></div><div class='line' id='LC81'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC82'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">f</span><span class="p">.</span><span class="nx">start</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">f</span><span class="p">.</span><span class="nx">end</span><span class="p">]</span> <span class="o">=</span> <span class="nx">f</span><span class="p">;</span></div><div class='line' id='LC83'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC84'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC85'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">f</span> <span class="o">=</span> <span class="p">[</span><span class="nx">i</span><span class="p">];</span></div><div class='line' id='LC86'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fragmentByStart</span><span class="p">[</span><span class="nx">f</span><span class="p">.</span><span class="nx">start</span> <span class="o">=</span> <span class="nx">start</span><span class="p">]</span> <span class="o">=</span> <span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">f</span><span class="p">.</span><span class="nx">end</span> <span class="o">=</span> <span class="nx">end</span><span class="p">]</span> <span class="o">=</span> <span class="nx">f</span><span class="p">;</span></div><div class='line' id='LC87'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC88'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">});</span></div><div class='line' id='LC89'><br/></div><div class='line' id='LC90'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">ends</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC91'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">arc</span> <span class="o">=</span> <span class="nx">topology</span><span class="p">.</span><span class="nx">arcs</span><span class="p">[</span><span class="nx">i</span><span class="p">],</span> <span class="nx">p0</span> <span class="o">=</span> <span class="nx">arc</span><span class="p">[</span><span class="mi">0</span><span class="p">],</span> <span class="nx">p1</span> <span class="o">=</span> <span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">];</span></div><div class='line' id='LC92'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">arc</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">dp</span><span class="p">)</span> <span class="p">{</span> <span class="nx">p1</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">+=</span> <span class="nx">dp</span><span class="p">[</span><span class="mi">0</span><span class="p">],</span> <span class="nx">p1</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">+=</span> <span class="nx">dp</span><span class="p">[</span><span class="mi">1</span><span class="p">];</span> <span class="p">});</span></div><div class='line' id='LC93'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="p">[</span><span class="nx">p0</span><span class="p">,</span> <span class="nx">p1</span><span class="p">];</span></div><div class='line' id='LC94'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC95'><br/></div><div class='line' id='LC96'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">fragments</span> <span class="o">=</span> <span class="p">[];</span></div><div class='line' id='LC97'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">k</span> <span class="k">in</span> <span class="nx">fragmentByEnd</span><span class="p">)</span> <span class="nx">fragments</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">fragmentByEnd</span><span class="p">[</span><span class="nx">k</span><span class="p">]);</span></div><div class='line' id='LC98'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">fragments</span><span class="p">;</span></div><div class='line' id='LC99'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC100'><br/></div><div class='line' id='LC101'>&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">mesh</span><span class="p">(</span><span class="nx">topology</span><span class="p">,</span> <span class="nx">o</span><span class="p">,</span> <span class="nx">filter</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC102'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">arcs</span> <span class="o">=</span> <span class="p">[];</span></div><div class='line' id='LC103'><br/></div><div class='line' id='LC104'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;</span> <span class="mi">1</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC105'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">geomsByArc</span> <span class="o">=</span> <span class="p">[],</span></div><div class='line' id='LC106'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">geom</span><span class="p">;</span></div><div class='line' id='LC107'><br/></div><div class='line' id='LC108'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">arc</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC109'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="mi">0</span><span class="p">)</span> <span class="nx">i</span> <span class="o">=</span> <span class="o">~</span><span class="nx">i</span><span class="p">;</span></div><div class='line' id='LC110'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">(</span><span class="nx">geomsByArc</span><span class="p">[</span><span class="nx">i</span><span class="p">]</span> <span class="o">||</span> <span class="p">(</span><span class="nx">geomsByArc</span><span class="p">[</span><span class="nx">i</span><span class="p">]</span> <span class="o">=</span> <span class="p">[])).</span><span class="nx">push</span><span class="p">(</span><span class="nx">geom</span><span class="p">);</span></div><div class='line' id='LC111'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC112'><br/></div><div class='line' id='LC113'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">line</span><span class="p">(</span><span class="nx">arcs</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC114'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">arcs</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="nx">arc</span><span class="p">);</span></div><div class='line' id='LC115'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC116'><br/></div><div class='line' id='LC117'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">polygon</span><span class="p">(</span><span class="nx">arcs</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC118'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">arcs</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="nx">line</span><span class="p">);</span></div><div class='line' id='LC119'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC120'><br/></div><div class='line' id='LC121'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">geometry</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC122'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">type</span> <span class="o">===</span> <span class="s2">&quot;GeometryCollection&quot;</span><span class="p">)</span> <span class="nx">o</span><span class="p">.</span><span class="nx">geometries</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="nx">geometry</span><span class="p">);</span></div><div class='line' id='LC123'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">type</span> <span class="k">in</span> <span class="nx">geometryType</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC124'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">geom</span> <span class="o">=</span> <span class="nx">o</span><span class="p">;</span></div><div class='line' id='LC125'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">geometryType</span><span class="p">[</span><span class="nx">o</span><span class="p">.</span><span class="nx">type</span><span class="p">](</span><span class="nx">o</span><span class="p">.</span><span class="nx">arcs</span><span class="p">);</span></div><div class='line' id='LC126'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC127'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC128'><br/></div><div class='line' id='LC129'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">geometryType</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC130'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">LineString</span><span class="o">:</span> <span class="nx">line</span><span class="p">,</span></div><div class='line' id='LC131'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">MultiLineString</span><span class="o">:</span> <span class="nx">polygon</span><span class="p">,</span></div><div class='line' id='LC132'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">Polygon</span><span class="o">:</span> <span class="nx">polygon</span><span class="p">,</span></div><div class='line' id='LC133'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">MultiPolygon</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">arcs</span><span class="p">)</span> <span class="p">{</span> <span class="nx">arcs</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="nx">polygon</span><span class="p">);</span> <span class="p">}</span></div><div class='line' id='LC134'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">};</span></div><div class='line' id='LC135'><br/></div><div class='line' id='LC136'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">geometry</span><span class="p">(</span><span class="nx">o</span><span class="p">);</span></div><div class='line' id='LC137'><br/></div><div class='line' id='LC138'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">geomsByArc</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span> <span class="o">&lt;</span> <span class="mi">3</span></div><div class='line' id='LC139'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="o">?</span> <span class="kd">function</span><span class="p">(</span><span class="nx">geoms</span><span class="p">,</span> <span class="nx">i</span><span class="p">)</span> <span class="p">{</span> <span class="nx">arcs</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">i</span><span class="p">);</span> <span class="p">}</span></div><div class='line' id='LC140'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">geoms</span><span class="p">,</span> <span class="nx">i</span><span class="p">)</span> <span class="p">{</span> <span class="k">if</span> <span class="p">(</span><span class="nx">filter</span><span class="p">(</span><span class="nx">geoms</span><span class="p">[</span><span class="mi">0</span><span class="p">],</span> <span class="nx">geoms</span><span class="p">[</span><span class="nx">geoms</span><span class="p">.</span><span class="nx">length</span> <span class="o">-</span> <span class="mi">1</span><span class="p">]))</span> <span class="nx">arcs</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">i</span><span class="p">);</span> <span class="p">});</span></div><div class='line' id='LC141'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC142'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">n</span> <span class="o">=</span> <span class="nx">topology</span><span class="p">.</span><span class="nx">arcs</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">;</span> <span class="o">++</span><span class="nx">i</span><span class="p">)</span> <span class="nx">arcs</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">i</span><span class="p">);</span></div><div class='line' id='LC143'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC144'><br/></div><div class='line' id='LC145'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">object</span><span class="p">(</span><span class="nx">topology</span><span class="p">,</span> <span class="p">{</span><span class="nx">type</span><span class="o">:</span> <span class="s2">&quot;MultiLineString&quot;</span><span class="p">,</span> <span class="nx">arcs</span><span class="o">:</span> <span class="nx">merge</span><span class="p">(</span><span class="nx">topology</span><span class="p">,</span> <span class="nx">arcs</span><span class="p">)});</span></div><div class='line' id='LC146'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC147'><br/></div><div class='line' id='LC148'>&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">featureOrCollection</span><span class="p">(</span><span class="nx">topology</span><span class="p">,</span> <span class="nx">o</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC149'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">o</span><span class="p">.</span><span class="nx">type</span> <span class="o">===</span> <span class="s2">&quot;GeometryCollection&quot;</span> <span class="o">?</span> <span class="p">{</span></div><div class='line' id='LC150'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">type</span><span class="o">:</span> <span class="s2">&quot;FeatureCollection&quot;</span><span class="p">,</span></div><div class='line' id='LC151'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">features</span><span class="o">:</span> <span class="nx">o</span><span class="p">.</span><span class="nx">geometries</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">feature</span><span class="p">(</span><span class="nx">topology</span><span class="p">,</span> <span class="nx">o</span><span class="p">);</span> <span class="p">})</span></div><div class='line' id='LC152'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span> <span class="o">:</span> <span class="nx">feature</span><span class="p">(</span><span class="nx">topology</span><span class="p">,</span> <span class="nx">o</span><span class="p">);</span></div><div class='line' id='LC153'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC154'><br/></div><div class='line' id='LC155'>&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">feature</span><span class="p">(</span><span class="nx">topology</span><span class="p">,</span> <span class="nx">o</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC156'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">f</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC157'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">type</span><span class="o">:</span> <span class="s2">&quot;Feature&quot;</span><span class="p">,</span></div><div class='line' id='LC158'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">id</span><span class="o">:</span> <span class="nx">o</span><span class="p">.</span><span class="nx">id</span><span class="p">,</span></div><div class='line' id='LC159'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">properties</span><span class="o">:</span> <span class="nx">o</span><span class="p">.</span><span class="nx">properties</span> <span class="o">||</span> <span class="p">{},</span></div><div class='line' id='LC160'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">geometry</span><span class="o">:</span> <span class="nx">object</span><span class="p">(</span><span class="nx">topology</span><span class="p">,</span> <span class="nx">o</span><span class="p">)</span></div><div class='line' id='LC161'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">};</span></div><div class='line' id='LC162'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">id</span> <span class="o">==</span> <span class="kc">null</span><span class="p">)</span> <span class="k">delete</span> <span class="nx">f</span><span class="p">.</span><span class="nx">id</span><span class="p">;</span></div><div class='line' id='LC163'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">f</span><span class="p">;</span></div><div class='line' id='LC164'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC165'><br/></div><div class='line' id='LC166'>&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">object</span><span class="p">(</span><span class="nx">topology</span><span class="p">,</span> <span class="nx">o</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC167'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">tf</span> <span class="o">=</span> <span class="nx">topology</span><span class="p">.</span><span class="nx">transform</span><span class="p">,</span></div><div class='line' id='LC168'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">kx</span> <span class="o">=</span> <span class="nx">tf</span><span class="p">.</span><span class="nx">scale</span><span class="p">[</span><span class="mi">0</span><span class="p">],</span></div><div class='line' id='LC169'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">ky</span> <span class="o">=</span> <span class="nx">tf</span><span class="p">.</span><span class="nx">scale</span><span class="p">[</span><span class="mi">1</span><span class="p">],</span></div><div class='line' id='LC170'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">dx</span> <span class="o">=</span> <span class="nx">tf</span><span class="p">.</span><span class="nx">translate</span><span class="p">[</span><span class="mi">0</span><span class="p">],</span></div><div class='line' id='LC171'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">dy</span> <span class="o">=</span> <span class="nx">tf</span><span class="p">.</span><span class="nx">translate</span><span class="p">[</span><span class="mi">1</span><span class="p">],</span></div><div class='line' id='LC172'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">arcs</span> <span class="o">=</span> <span class="nx">topology</span><span class="p">.</span><span class="nx">arcs</span><span class="p">;</span></div><div class='line' id='LC173'><br/></div><div class='line' id='LC174'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">arc</span><span class="p">(</span><span class="nx">i</span><span class="p">,</span> <span class="nx">points</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC175'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">points</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="nx">points</span><span class="p">.</span><span class="nx">pop</span><span class="p">();</span></div><div class='line' id='LC176'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">a</span> <span class="o">=</span> <span class="nx">arcs</span><span class="p">[</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="mi">0</span> <span class="o">?</span> <span class="o">~</span><span class="nx">i</span> <span class="o">:</span> <span class="nx">i</span><span class="p">],</span> <span class="nx">k</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">n</span> <span class="o">=</span> <span class="nx">a</span><span class="p">.</span><span class="nx">length</span><span class="p">,</span> <span class="nx">x</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">y</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">p</span><span class="p">;</span> <span class="nx">k</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">;</span> <span class="o">++</span><span class="nx">k</span><span class="p">)</span> <span class="nx">points</span><span class="p">.</span><span class="nx">push</span><span class="p">([</span></div><div class='line' id='LC177'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">(</span><span class="nx">x</span> <span class="o">+=</span> <span class="p">(</span><span class="nx">p</span> <span class="o">=</span> <span class="nx">a</span><span class="p">[</span><span class="nx">k</span><span class="p">])[</span><span class="mi">0</span><span class="p">])</span> <span class="o">*</span> <span class="nx">kx</span> <span class="o">+</span> <span class="nx">dx</span><span class="p">,</span></div><div class='line' id='LC178'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">(</span><span class="nx">y</span> <span class="o">+=</span> <span class="nx">p</span><span class="p">[</span><span class="mi">1</span><span class="p">])</span> <span class="o">*</span> <span class="nx">ky</span> <span class="o">+</span> <span class="nx">dy</span></div><div class='line' id='LC179'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">]);</span></div><div class='line' id='LC180'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="mi">0</span><span class="p">)</span> <span class="nx">reverse</span><span class="p">(</span><span class="nx">points</span><span class="p">,</span> <span class="nx">n</span><span class="p">);</span></div><div class='line' id='LC181'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC182'><br/></div><div class='line' id='LC183'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">point</span><span class="p">(</span><span class="nx">coordinates</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC184'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="p">[</span><span class="nx">coordinates</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">*</span> <span class="nx">kx</span> <span class="o">+</span> <span class="nx">dx</span><span class="p">,</span> <span class="nx">coordinates</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">*</span> <span class="nx">ky</span> <span class="o">+</span> <span class="nx">dy</span><span class="p">];</span></div><div class='line' id='LC185'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC186'><br/></div><div class='line' id='LC187'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">line</span><span class="p">(</span><span class="nx">arcs</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC188'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">points</span> <span class="o">=</span> <span class="p">[];</span></div><div class='line' id='LC189'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">n</span> <span class="o">=</span> <span class="nx">arcs</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">n</span><span class="p">;</span> <span class="o">++</span><span class="nx">i</span><span class="p">)</span> <span class="nx">arc</span><span class="p">(</span><span class="nx">arcs</span><span class="p">[</span><span class="nx">i</span><span class="p">],</span> <span class="nx">points</span><span class="p">);</span></div><div class='line' id='LC190'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">points</span><span class="p">.</span><span class="nx">length</span> <span class="o">&lt;</span> <span class="mi">2</span><span class="p">)</span> <span class="nx">points</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">points</span><span class="p">[</span><span class="mi">0</span><span class="p">]);</span></div><div class='line' id='LC191'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">points</span><span class="p">;</span></div><div class='line' id='LC192'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC193'><br/></div><div class='line' id='LC194'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">ring</span><span class="p">(</span><span class="nx">arcs</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC195'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">points</span> <span class="o">=</span> <span class="nx">line</span><span class="p">(</span><span class="nx">arcs</span><span class="p">);</span></div><div class='line' id='LC196'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">while</span> <span class="p">(</span><span class="nx">points</span><span class="p">.</span><span class="nx">length</span> <span class="o">&lt;</span> <span class="mi">4</span><span class="p">)</span> <span class="nx">points</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">points</span><span class="p">[</span><span class="mi">0</span><span class="p">]);</span></div><div class='line' id='LC197'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">points</span><span class="p">;</span></div><div class='line' id='LC198'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC199'><br/></div><div class='line' id='LC200'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">polygon</span><span class="p">(</span><span class="nx">arcs</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC201'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">arcs</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">ring</span><span class="p">);</span></div><div class='line' id='LC202'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC203'><br/></div><div class='line' id='LC204'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">geometry</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC205'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">t</span> <span class="o">=</span> <span class="nx">o</span><span class="p">.</span><span class="nx">type</span><span class="p">;</span></div><div class='line' id='LC206'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">t</span> <span class="o">===</span> <span class="s2">&quot;GeometryCollection&quot;</span> <span class="o">?</span> <span class="p">{</span><span class="nx">type</span><span class="o">:</span> <span class="nx">t</span><span class="p">,</span> <span class="nx">geometries</span><span class="o">:</span> <span class="nx">o</span><span class="p">.</span><span class="nx">geometries</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">geometry</span><span class="p">)}</span></div><div class='line' id='LC207'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="o">:</span> <span class="nx">t</span> <span class="k">in</span> <span class="nx">geometryType</span> <span class="o">?</span> <span class="p">{</span><span class="nx">type</span><span class="o">:</span> <span class="nx">t</span><span class="p">,</span> <span class="nx">coordinates</span><span class="o">:</span> <span class="nx">geometryType</span><span class="p">[</span><span class="nx">t</span><span class="p">](</span><span class="nx">o</span><span class="p">)}</span></div><div class='line' id='LC208'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="o">:</span> <span class="kc">null</span><span class="p">;</span></div><div class='line' id='LC209'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC210'><br/></div><div class='line' id='LC211'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">geometryType</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC212'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">Point</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">point</span><span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">);</span> <span class="p">},</span></div><div class='line' id='LC213'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">MultiPoint</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">o</span><span class="p">.</span><span class="nx">coordinates</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">point</span><span class="p">);</span> <span class="p">},</span></div><div class='line' id='LC214'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">LineString</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">line</span><span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">arcs</span><span class="p">);</span> <span class="p">},</span></div><div class='line' id='LC215'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">MultiLineString</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">o</span><span class="p">.</span><span class="nx">arcs</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">line</span><span class="p">);</span> <span class="p">},</span></div><div class='line' id='LC216'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">Polygon</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">polygon</span><span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">arcs</span><span class="p">);</span> <span class="p">},</span></div><div class='line' id='LC217'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">MultiPolygon</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="nx">o</span><span class="p">.</span><span class="nx">arcs</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">polygon</span><span class="p">);</span> <span class="p">}</span></div><div class='line' id='LC218'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">};</span></div><div class='line' id='LC219'><br/></div><div class='line' id='LC220'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">geometry</span><span class="p">(</span><span class="nx">o</span><span class="p">);</span></div><div class='line' id='LC221'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC222'><br/></div><div class='line' id='LC223'>&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">reverse</span><span class="p">(</span><span class="nx">array</span><span class="p">,</span> <span class="nx">n</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC224'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">t</span><span class="p">,</span> <span class="nx">j</span> <span class="o">=</span> <span class="nx">array</span><span class="p">.</span><span class="nx">length</span><span class="p">,</span> <span class="nx">i</span> <span class="o">=</span> <span class="nx">j</span> <span class="o">-</span> <span class="nx">n</span><span class="p">;</span> <span class="k">while</span> <span class="p">(</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="o">--</span><span class="nx">j</span><span class="p">)</span> <span class="nx">t</span> <span class="o">=</span> <span class="nx">array</span><span class="p">[</span><span class="nx">i</span><span class="p">],</span> <span class="nx">array</span><span class="p">[</span><span class="nx">i</span><span class="o">++</span><span class="p">]</span> <span class="o">=</span> <span class="nx">array</span><span class="p">[</span><span class="nx">j</span><span class="p">],</span> <span class="nx">array</span><span class="p">[</span><span class="nx">j</span><span class="p">]</span> <span class="o">=</span> <span class="nx">t</span><span class="p">;</span></div><div class='line' id='LC225'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC226'><br/></div><div class='line' id='LC227'>&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">bisect</span><span class="p">(</span><span class="nx">a</span><span class="p">,</span> <span class="nx">x</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC228'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">lo</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">hi</span> <span class="o">=</span> <span class="nx">a</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span></div><div class='line' id='LC229'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">while</span> <span class="p">(</span><span class="nx">lo</span> <span class="o">&lt;</span> <span class="nx">hi</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC230'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">mid</span> <span class="o">=</span> <span class="nx">lo</span> <span class="o">+</span> <span class="nx">hi</span> <span class="o">&gt;&gt;&gt;</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC231'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">a</span><span class="p">[</span><span class="nx">mid</span><span class="p">]</span> <span class="o">&lt;</span> <span class="nx">x</span><span class="p">)</span> <span class="nx">lo</span> <span class="o">=</span> <span class="nx">mid</span> <span class="o">+</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC232'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="nx">hi</span> <span class="o">=</span> <span class="nx">mid</span><span class="p">;</span></div><div class='line' id='LC233'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC234'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">lo</span><span class="p">;</span></div><div class='line' id='LC235'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC236'><br/></div><div class='line' id='LC237'>&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">neighbors</span><span class="p">(</span><span class="nx">objects</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC238'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">indexesByArc</span> <span class="o">=</span> <span class="p">{},</span> <span class="c1">// arc index -&gt; array of object indexes</span></div><div class='line' id='LC239'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">neighbors</span> <span class="o">=</span> <span class="nx">objects</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span> <span class="k">return</span> <span class="p">[];</span> <span class="p">});</span></div><div class='line' id='LC240'><br/></div><div class='line' id='LC241'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">line</span><span class="p">(</span><span class="nx">arcs</span><span class="p">,</span> <span class="nx">i</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC242'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">arcs</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">a</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC243'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">a</span> <span class="o">&lt;</span> <span class="mi">0</span><span class="p">)</span> <span class="nx">a</span> <span class="o">=</span> <span class="o">~</span><span class="nx">a</span><span class="p">;</span></div><div class='line' id='LC244'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">o</span> <span class="o">=</span> <span class="nx">indexesByArc</span><span class="p">[</span><span class="nx">a</span><span class="p">];</span></div><div class='line' id='LC245'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="nx">o</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">i</span><span class="p">);</span></div><div class='line' id='LC246'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="nx">indexesByArc</span><span class="p">[</span><span class="nx">a</span><span class="p">]</span> <span class="o">=</span> <span class="p">[</span><span class="nx">i</span><span class="p">];</span></div><div class='line' id='LC247'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">});</span></div><div class='line' id='LC248'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC249'><br/></div><div class='line' id='LC250'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">polygon</span><span class="p">(</span><span class="nx">arcs</span><span class="p">,</span> <span class="nx">i</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC251'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">arcs</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">arc</span><span class="p">)</span> <span class="p">{</span> <span class="nx">line</span><span class="p">(</span><span class="nx">arc</span><span class="p">,</span> <span class="nx">i</span><span class="p">);</span> <span class="p">});</span></div><div class='line' id='LC252'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC253'><br/></div><div class='line' id='LC254'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">geometry</span><span class="p">(</span><span class="nx">o</span><span class="p">,</span> <span class="nx">i</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC255'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">type</span> <span class="o">===</span> <span class="s2">&quot;GeometryCollection&quot;</span><span class="p">)</span> <span class="nx">o</span><span class="p">.</span><span class="nx">geometries</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span> <span class="p">{</span> <span class="nx">geometry</span><span class="p">(</span><span class="nx">o</span><span class="p">,</span> <span class="nx">i</span><span class="p">);</span> <span class="p">});</span></div><div class='line' id='LC256'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">o</span><span class="p">.</span><span class="nx">type</span> <span class="k">in</span> <span class="nx">geometryType</span><span class="p">)</span> <span class="nx">geometryType</span><span class="p">[</span><span class="nx">o</span><span class="p">.</span><span class="nx">type</span><span class="p">](</span><span class="nx">o</span><span class="p">.</span><span class="nx">arcs</span><span class="p">,</span> <span class="nx">i</span><span class="p">);</span></div><div class='line' id='LC257'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC258'><br/></div><div class='line' id='LC259'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">geometryType</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC260'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">LineString</span><span class="o">:</span> <span class="nx">line</span><span class="p">,</span></div><div class='line' id='LC261'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">MultiLineString</span><span class="o">:</span> <span class="nx">polygon</span><span class="p">,</span></div><div class='line' id='LC262'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">Polygon</span><span class="o">:</span> <span class="nx">polygon</span><span class="p">,</span></div><div class='line' id='LC263'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">MultiPolygon</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">arcs</span><span class="p">,</span> <span class="nx">i</span><span class="p">)</span> <span class="p">{</span> <span class="nx">arcs</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">arc</span><span class="p">)</span> <span class="p">{</span> <span class="nx">polygon</span><span class="p">(</span><span class="nx">arc</span><span class="p">,</span> <span class="nx">i</span><span class="p">);</span> <span class="p">});</span> <span class="p">}</span></div><div class='line' id='LC264'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">};</span></div><div class='line' id='LC265'><br/></div><div class='line' id='LC266'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">objects</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="nx">geometry</span><span class="p">);</span></div><div class='line' id='LC267'><br/></div><div class='line' id='LC268'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="k">in</span> <span class="nx">indexesByArc</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC269'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">indexes</span> <span class="o">=</span> <span class="nx">indexesByArc</span><span class="p">[</span><span class="nx">i</span><span class="p">],</span> <span class="nx">m</span> <span class="o">=</span> <span class="nx">indexes</span><span class="p">.</span><span class="nx">length</span><span class="p">,</span> <span class="nx">j</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">j</span> <span class="o">&lt;</span> <span class="nx">m</span><span class="p">;</span> <span class="o">++</span><span class="nx">j</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC270'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">k</span> <span class="o">=</span> <span class="nx">j</span> <span class="o">+</span> <span class="mi">1</span><span class="p">;</span> <span class="nx">k</span> <span class="o">&lt;</span> <span class="nx">m</span><span class="p">;</span> <span class="o">++</span><span class="nx">k</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC271'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">ij</span> <span class="o">=</span> <span class="nx">indexes</span><span class="p">[</span><span class="nx">j</span><span class="p">],</span> <span class="nx">ik</span> <span class="o">=</span> <span class="nx">indexes</span><span class="p">[</span><span class="nx">k</span><span class="p">],</span> <span class="nx">n</span><span class="p">;</span></div><div class='line' id='LC272'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">((</span><span class="nx">n</span> <span class="o">=</span> <span class="nx">neighbors</span><span class="p">[</span><span class="nx">ij</span><span class="p">])[</span><span class="nx">i</span> <span class="o">=</span> <span class="nx">bisect</span><span class="p">(</span><span class="nx">n</span><span class="p">,</span> <span class="nx">ik</span><span class="p">)]</span> <span class="o">!==</span> <span class="nx">ik</span><span class="p">)</span> <span class="nx">n</span><span class="p">.</span><span class="nx">splice</span><span class="p">(</span><span class="nx">i</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">ik</span><span class="p">);</span></div><div class='line' id='LC273'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">((</span><span class="nx">n</span> <span class="o">=</span> <span class="nx">neighbors</span><span class="p">[</span><span class="nx">ik</span><span class="p">])[</span><span class="nx">i</span> <span class="o">=</span> <span class="nx">bisect</span><span class="p">(</span><span class="nx">n</span><span class="p">,</span> <span class="nx">ij</span><span class="p">)]</span> <span class="o">!==</span> <span class="nx">ij</span><span class="p">)</span> <span class="nx">n</span><span class="p">.</span><span class="nx">splice</span><span class="p">(</span><span class="nx">i</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">ij</span><span class="p">);</span></div><div class='line' id='LC274'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC275'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC276'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC277'><br/></div><div class='line' id='LC278'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">neighbors</span><span class="p">;</span></div><div class='line' id='LC279'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC280'><br/></div><div class='line' id='LC281'>&nbsp;&nbsp;<span class="k">return</span> <span class="p">{</span></div><div class='line' id='LC282'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">version</span><span class="o">:</span> <span class="s2">&quot;1.1.4&quot;</span><span class="p">,</span></div><div class='line' id='LC283'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">mesh</span><span class="o">:</span> <span class="nx">mesh</span><span class="p">,</span></div><div class='line' id='LC284'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">feature</span><span class="o">:</span> <span class="nx">featureOrCollection</span><span class="p">,</span></div><div class='line' id='LC285'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">neighbors</span><span class="o">:</span> <span class="nx">neighbors</span></div><div class='line' id='LC286'>&nbsp;&nbsp;<span class="p">};</span></div><div class='line' id='LC287'><span class="p">})();</span></div></pre></div>
          </td>
        </tr>
      </table>
  </div>

          </div>
        </div>

        <a href="#jump-to-line" rel="facebox[.linejump]" data-hotkey="l" class="js-jump-to-line" style="display:none">Jump to Line</a>
        <div id="jump-to-line" style="display:none">
          <form accept-charset="UTF-8" class="js-jump-to-line-form">
            <input class="linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;">
            <button type="submit" class="button">Go</button>
          </form>
        </div>

</div>

<div id="js-frame-loading-template" class="frame frame-loading large-loading-area" style="display:none;">
  <img class="js-frame-loading-spinner" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-128.gif" height="64" width="64">
</div>


          </div>
        </div>

      </div><!-- /.repo-container -->
      <div class="modal-backdrop"></div>
    </div>
  </div><!-- /.site -->


    </div><!-- /.wrapper -->

      <div class="container">
  <div class="site-footer">
    <ul class="site-footer-links right">
      <li><a href="https://status.github.com/">Status</a></li>
      <li><a href="http://developer.github.com">Developer</a></li>
      <li><a href="http://training.github.com">Training</a></li>
      <li><a href="http://shop.github.com">Shop</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about">About</a></li>
    </ul>

    <a href="/">
      <span class="mega-octicon octicon-mark-github"></span>
    </a>

    <ul class="site-footer-links">
      <li>&copy; 2013 <span title="0.06319s from fe13.rs.github.com">GitHub</span>, Inc.</li>
        <li><a href="/site/terms">Terms</a></li>
        <li><a href="/site/privacy">Privacy</a></li>
        <li><a href="/security">Security</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
  </div><!-- /.site-footer -->
</div><!-- /.container -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-fullscreen-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="js-fullscreen-contents" placeholder="" data-suggester="fullscreen_suggester"></textarea>
          <div class="suggester-container">
              <div class="suggester fullscreen-suggester js-navigation-container" id="fullscreen_suggester"
                 data-url="/mbostock/topojson/suggestions/commit">
              </div>
          </div>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped leftwards" title="Exit Zen Mode">
      <span class="mega-octicon octicon-screen-normal"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped leftwards"
      title="Switch themes">
      <span class="octicon octicon-color-mode"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      <a href="#" class="octicon octicon-remove-close close ajax-error-dismiss"></a>
      Something went wrong with that request. Please try again.
    </div>

    
    <span id='server_response_time' data-time='0.06360' data-host='fe13'></span>
    
  </body>
</html>

