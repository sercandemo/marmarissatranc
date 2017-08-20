---
title: Turnuvalar
permalink: turnuvalar/index.html
layout: default
---

<table class="table table-bordered table-striped">
<tbody>
<tr>
  <th>Tarih</th>
  <th>Turnuva Adı</th>
</tr>

{% assign myfiles = site.static_files | sort: 'name' | reverse %}

{% for myfile in myfiles %}

{% if myfile.path contains 'data/turnuvalar/' %}

{% assign tarih = myfile.basename | split: '-' %}
{% assign tarihs = tarih[0] | append: '-' | append: tarih[1] | append: '-' | append: tarih[2] %}

<tr>
<td class="col-md-3">
{% assign dy = tarihs | date: "%A" %}
{{ site.data.tr.[dy] }},
{{ tarihs | date: "%-d" }}
{% assign m = tarihs | date: "%-m" | minus: 1 %}
{{ site.data.tr.months[m] }}
{{ tarihs | date: "%Y" }}
</td>
<td class="col-md-9"><a href="{{ site.github.url }}/turnuvalar/{{ myfile.basename }}" > {{ site.data.turnuvalar[myfile.basename].adi }} </a></td>
</tr>
{% endif %}

{% endfor %}

</tbody>
</table>
