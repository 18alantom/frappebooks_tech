import CompleteRewrite from './CompleteRewrite.vue';
import EnablingTranslations from './EnablingTranslations.vue';
import RefactoringCharts from './RefactoringCharts.vue';
import Why from './Why.vue';

/*
frontmatter = {
  path: '/path_to_post',
  title: 'Post Name',
  author: 'Post Author',
  date: '2022-01-31',
  first: 'What is the post about?'
};
*/

export default [Why, RefactoringCharts, EnablingTranslations, CompleteRewrite]
  .map((component) => Object.assign(component.data(), { component }))
  .sort(({ date: a }, { date: b }) => new Date(b) - new Date(a));
