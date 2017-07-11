---
---
<div>
  {% for post in site.posts %}
    <p>
      <h2><a href="{{ site.github.repository_name }}/{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.content | strip_html | truncatewords: 50 }}
    </p>
  {% endfor %}
</div>
