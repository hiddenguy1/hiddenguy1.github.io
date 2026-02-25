/**
 * 本地搜索功能
 * 基于 hexo-generator-searchdb 生成的 search.xml
 */

(function() {
  // 搜索配置
  var searchConfig = {
    path: '/search.xml', // 搜索索引文件路径
    engine: 'auto', // 搜索引擎：auto, xml, json
    limit: 10, // 搜索结果数量限制
    truncate: 150 // 摘要长度限制
  };

  var searchInput = null;
  var searchResults = null;
  var searchData = null;
  var isSearching = false;

  // 初始化搜索功能
  function initSearch() {
    // 检查是否启用了搜索
    if (!yiliaConfig.search) {
      console.log('搜索功能未启用');
      return;
    }

    // 获取搜索输入框元素
    searchInput = document.getElementById('search-input');
    if (!searchInput) {
      // 如果没有搜索输入框，创建一个
      var searchFormWrap = document.getElementById('search-form-wrap');
      if (searchFormWrap) {
        searchInput = document.createElement('input');
        searchInput.id = 'search-input';
        searchInput.type = 'text';
        searchInput.placeholder = '搜索文章...';
        searchInput.autocomplete = 'off';
        searchFormWrap.innerHTML = '';
        searchFormWrap.appendChild(searchInput);
      }
    }

    if (!searchInput) {
      console.error('无法找到搜索输入框');
      return;
    }

    // 创建搜索结果容器
    searchResults = document.createElement('div');
    searchResults.id = 'search-results';
    searchResults.className = 'search-results';
    searchResults.style.display = 'none';
    searchInput.parentNode.appendChild(searchResults);

    // 加载搜索数据
    loadSearchData();

    // 绑定事件
    bindEvents();
  }

  // 加载搜索数据
  function loadSearchData() {
    var searchPath = searchConfig.path;

    fetch(searchPath)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('无法加载搜索索引文件');
        }
        return response.text();
      })
      .then(function(text) {
        // 解析 XML 数据
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(text, 'text/xml');
        searchData = parseSearchData(xmlDoc);
        console.log('搜索数据加载完成，共 ' + searchData.length + ' 篇文章');
      })
      .catch(function(error) {
        console.error('加载搜索数据失败:', error);
      });
  }

  // 解析搜索数据
  function parseSearchData(xmlDoc) {
    var entries = xmlDoc.querySelectorAll('entry');
    var data = [];

    entries.forEach(function(entry) {
      var title = entry.querySelector('title').textContent;
      var url = entry.querySelector('url').textContent;
      var content = entry.querySelector('content') ? entry.querySelector('content').textContent : '';

      data.push({
        title: title,
        url: url,
        content: content
      });
    });

    return data;
  }

  // 绑定事件
  function bindEvents() {
    var searchBtn = document.getElementById('nav-search-btn');
    var searchFormWrap = document.getElementById('search-form-wrap');

    // 点击搜索按钮
    if (searchBtn) {
      searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleSearch();
      });
    }

    // 输入框输入事件
    searchInput.addEventListener('input', function(e) {
      var query = e.target.value.trim();
      if (query.length > 0) {
        performSearch(query);
      } else {
        hideSearchResults();
      }
    });

    // 输入框获得焦点事件
    searchInput.addEventListener('focus', function() {
      if (searchInput.value.trim().length > 0) {
        showSearchResults();
      }
    });

    // 点击其他地方关闭搜索结果
    document.addEventListener('click', function(e) {
      if (!searchFormWrap.contains(e.target)) {
        hideSearchResults();
      }
    });

    // ESC 键关闭搜索
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        hideSearchResults();
        if (isSearching) {
          toggleSearch();
        }
      }
    });
  }

  // 切换搜索框显示
  function toggleSearch() {
    var searchFormWrap = document.getElementById('search-form-wrap');
    isSearching = !isSearching;

    if (isSearching) {
      searchFormWrap.classList.add('show');
      searchInput.focus();
    } else {
      searchFormWrap.classList.remove('show');
      hideSearchResults();
      searchInput.value = '';
    }
  }

  // 执行搜索
  function performSearch(query) {
    if (!searchData || searchData.length === 0) {
      showSearchResults('<div class="search-loading">搜索数据加载中...</div>');
      return;
    }

    var results = [];
    var queryLower = query.toLowerCase();

    searchData.forEach(function(item) {
      var titleLower = item.title.toLowerCase();
      var contentLower = item.content.toLowerCase();

      // 搜索标题和内容
      var titleMatch = titleLower.indexOf(queryLower) > -1;
      var contentMatch = contentLower.indexOf(queryLower) > -1;

      if (titleMatch || contentMatch) {
        var excerpt = '';
        if (contentMatch) {
          var index = contentLower.indexOf(queryLower);
          var start = Math.max(0, index - 50);
          var end = Math.min(contentLower.length, index + query.length + 50);
          excerpt = item.content.substring(start, end);
          if (start > 0) excerpt = '...' + excerpt;
          if (end < contentLower.length) excerpt = excerpt + '...';
        } else {
          excerpt = item.content.substring(0, searchConfig.truncate);
        }

        results.push({
          title: item.title,
          url: item.url,
          excerpt: excerpt,
          titleMatch: titleMatch,
          contentMatch: contentMatch
        });
      }
    });

    // 排序结果：标题匹配优先
    results.sort(function(a, b) {
      if (a.titleMatch && !b.titleMatch) return -1;
      if (!a.titleMatch && b.titleMatch) return 1;
      return 0;
    });

    // 限制结果数量
    results = results.slice(0, searchConfig.limit);

    displaySearchResults(results, query);
  }

  // 显示搜索结果
  function displaySearchResults(results, query) {
    if (results.length === 0) {
      showSearchResults('<div class="search-no-results">未找到相关文章</div>');
      return;
    }

    var html = '<div class="search-results-list">';
    results.forEach(function(result) {
      var title = highlightKeyword(result.title, query);
      var excerpt = highlightKeyword(result.excerpt, query);

      html += '<div class="search-result-item">';
      html += '<a class="search-result-title" href="' + result.url + '">' + title + '</a>';
      html += '<p class="search-result-excerpt">' + excerpt + '</p>';
      html += '</div>';
    });
    html += '</div>';

    showSearchResults(html);
  }

  // 高亮关键词
  function highlightKeyword(text, keyword) {
    if (!keyword) return text;
    var regex = new RegExp('(' + escapeRegExp(keyword) + ')', 'gi');
    return text.replace(regex, '<span class="search-keyword">$1</span>');
  }

  // 转义正则表达式特殊字符
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // 显示搜索结果容器
  function showSearchResults(html) {
    if (html) {
      searchResults.innerHTML = html;
    }
    searchResults.style.display = 'block';
  }

  // 隐藏搜索结果容器
  function hideSearchResults() {
    searchResults.style.display = 'none';
  }

  // 页面加载完成后初始化搜索
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();
